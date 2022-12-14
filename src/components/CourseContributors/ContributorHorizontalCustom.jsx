/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
} from "@aws-amplify/ui-react/internal";
import { Flex, Image, Text } from "@aws-amplify/ui-react";
import styles from "./CourseContributors.module.scss";
export default function ContributorHorizontal(props) {
  const { contributor, overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: {
        "Ellipse 15": {},
        "Frame 360": {},
        "Jane Doe": {},
        "Developer Advocate": {},
        "Frame 331": {},
        ContributorHorizontal: {},
      },
      variantValues: {
        property1: "Horizontal",
        property2: "Regular",
        property3: "false",
        property4: "false",
      },
    },
    {
      overrides: {
        "Ellipse 15": {},
        "Frame 360": { border: "2px SOLID rgba(233,94,7,1)" },
        "Jane Doe": { color: "rgba(233,94,7,1)" },
        "Developer Advocate": {},
        "Frame 331": {},
        ContributorHorizontal: {},
      },
      variantValues: {
        property1: "Horizontal",
        property2: "Regular",
        property3: "true",
        property4: "false",
      },
    },
    {
      overrides: {
        "Ellipse 15": {},
        "Frame 360": {
          border: "2px SOLID rgba(218,107,16,1)",
          backgroundColor: "rgba(242,243,243,1)",
        },
        "Jane Doe": { color: "rgba(218,107,16,1)" },
        "Developer Advocate": {},
        "Frame 331": {},
        ContributorHorizontal: {},
      },
      variantValues: {
        property1: "Horizontal",
        property2: "Regular",
        property3: "false",
        property4: "true",
      },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <Flex
      gap="16px"
      direction="row"
      alignItems="center"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "ContributorHorizontal")}
    >
      <Flex
        className={styles["profile-pic-container"]}
        gap="10px"
        direction="row"
        width="64px"
        height="64px"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        border="2px SOLID rgba(169,182,183,1)"
        borderRadius="100px"
        padding="4px 4px 4px 4px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Frame 360")}
      >
        <img
          width="52px"
          height="52px"
          style={{
            borderRadius: "50%",
          }}
          src={contributor?.profilePic}
          alt={`Profile picture`}
          {...getOverrideProps(overrides, "Ellipse 15")}
        />
      </Flex>
      <Flex
        gap="0"
        direction="column"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 331")}
      >
        <Text
          className={styles["contributor-name"]}
          fontFamily="Amazon Ember"
          fontSize="16px"
          fontWeight="700"
          color="rgba(0,116,189,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          children={`${contributor?.firstName}${" "}${contributor?.lastName}`}
          {...getOverrideProps(overrides, "Jane Doe")}
        ></Text>
        <Text
          fontFamily="Amazon Ember"
          fontSize="16px"
          fontWeight="400"
          color="rgba(84,91,100,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.01px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          children={contributor?.jobTitle}
          {...getOverrideProps(overrides, "Developer Advocate")}
        ></Text>
      </Flex>
    </Flex>
  );
}
