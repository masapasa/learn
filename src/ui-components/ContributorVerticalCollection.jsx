/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { Contributor, Course } from "../models";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import ContributorVertical from "./ContributorVertical";
import { Collection } from "@aws-amplify/ui-react";
export default function ContributorVerticalCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const courseItems = useDataStoreBinding({
    type: "collection",
    model: Course,
  }).items;
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Contributor,
  }).items.map((item) => ({
    ...item,
    courses: courseItems.filter((model) => model.contributor === item.id),
  }));
  const items = itemsProp !== undefined ? itemsProp : itemsDataStore;
  return (
    <Collection
      type="grid"
      searchPlaceholder="Search..."
      templateColumns="1fr 1fr"
      autoFlow="row"
      alignItems="stretch"
      justifyContent="stretch"
      items={items || []}
      {...rest}
      {...getOverrideProps(overrides, "ContributorVerticalCollection")}
    >
      {(item, index) => (
        <ContributorVertical
          contributor={item}
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></ContributorVertical>
      )}
    </Collection>
  );
}
