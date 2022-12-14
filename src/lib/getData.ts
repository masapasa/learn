import { Amplify, withSSRContext } from "aws-amplify";
import { GetStaticPropsContext } from "next";
import awsmobile from "../aws-exports";
import {
  Contributor,
  ContributorCourse,
  Course,
  CourseTag,
  Lesson,
  Tag,
} from "../models";
import { CardLayoutData, Context, CoursePageParams } from "../types/models";

export function configureAmplify() {
  Amplify.configure({ ...awsmobile, ssr: true });
}

configureAmplify();

export async function getFeaturedCourseData(
  context: GetStaticPropsContext & Context
): Promise<{ course: Course; tags: Tag[] } | null> {
  const { DataStore } = withSSRContext(context);

  const courses: Course[] = await DataStore.query(Course, (c: any) =>
    c.published("eq", true)
  );

  if (courses.length > 0) {
    const featuredCourses: Course[] = await DataStore.query(Course, (c: any) =>
      c.published("eq", true).isFeatured("eq", true)
    );

    const course =
      featuredCourses.length === 1 ? featuredCourses[0] : courses[0];

    const tags = await getCourseTags(context, course.id);

    return { course, tags };
  }

  return null;
}

export async function getCourseTags(
  context: GetStaticPropsContext & Context,
  courseId: string
): Promise<Tag[]> {
  const { DataStore } = withSSRContext(context);

  const courseTags: CourseTag[] = await DataStore.query(CourseTag);

  const filteredCourseTags = courseTags.filter(
    (e) => e.course.published && e.course.id === courseId
  );

  return filteredCourseTags.map((e) => e.tag);
}

export async function getCardLayoutData(
  context: GetStaticPropsContext & Context
): Promise<CardLayoutData[]> {
  const { DataStore } = withSSRContext(context);

  let courseTags: CourseTag[] = await DataStore.query(CourseTag);

  const groupedCourseTags: Record<string, CardLayoutData> = {};

  // Go through and group up the tags to their respective courses
  courseTags.forEach((courseTag) => {
    if (courseTag.course.published) {
      if (!groupedCourseTags.hasOwnProperty(courseTag.course.id)) {
        const tags = [courseTag.tag];

        groupedCourseTags[courseTag.course.id] = {
          course: courseTag.course,
          tags,
        };
      } else {
        const cardLayout = groupedCourseTags[courseTag.course.id];

        const tags = cardLayout.tags;
        tags.push(courseTag.tag);

        groupedCourseTags[courseTag.course.id] = {
          course: courseTag.course,
          tags,
        };
      }
    }
  });

  return Object.values(groupedCourseTags);
}

export async function getCourseAndLessonData(
  context: GetStaticPropsContext & Context
): Promise<{ course: Course; lessons: Lesson[] } | null> {
  const { DataStore } = withSSRContext(context);
  const { courseurltitle: encodedCourseUrlTitle } =
    context.params as CoursePageParams;

  const courseUrlTitle = decodeURIComponent(encodedCourseUrlTitle);

  // Get the course title without the appended id
  const originalCourseUrlTitle = courseUrlTitle
    ?.substring(0, courseUrlTitle?.lastIndexOf("-"))
    .replace(/-/g, " ");

  // Get the course Id prefix
  const courseIdPrefix = courseUrlTitle?.substring(
    courseUrlTitle?.lastIndexOf("-") + 1,
    courseUrlTitle.length
  );

  const courseResults: Course[] = await DataStore.query(Course, (c: any) =>
    c
      .published("eq", true)
      .id("beginsWith", courseIdPrefix)
      .courseUrlTitle("eq", originalCourseUrlTitle)
  );

  const courseResult = courseResults[0];

  if (courseResult) {
    const lessons: Lesson[] = await DataStore.query(Lesson, (l: any) =>
      l.lessonCourseLessonId("eq", courseResult.id)
    );

    const lessonsSorted = lessons.sort(
      (a: Lesson, b: Lesson) => a.lessonNumber - b.lessonNumber
    );

    return { course: courseResult, lessons: lessonsSorted };
  }

  return null;
}

export async function getCourseContributors(
  context: GetStaticPropsContext & Context,
  filterFn: (rel: ContributorCourse) => boolean
): Promise<Contributor[]> {
  const { DataStore } = withSSRContext(context);

  const contributorCourses = await DataStore.query(ContributorCourse);

  return contributorCourses
    .filter(filterFn)
    .map((e: ContributorCourse) => e.contributor);
}

export async function getContributors(
  context: GetStaticPropsContext & Context
): Promise<Contributor[]> {
  const { DataStore } = withSSRContext(context);

  const contributors = await DataStore.query(Contributor);

  return contributors;
}
