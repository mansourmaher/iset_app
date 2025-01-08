import Breadcrumb from "@/app/ui-components/breadcrumbs";
import React from "react";

interface Props {
  listofLinks: {
    name: string | null | undefined;
    url: string | null;
    current?: boolean;
  }[];
}

function CourseBreadCrumbs({ listofLinks }: Props) {
  return <Breadcrumb listofLinks={listofLinks} />;
}

export default CourseBreadCrumbs;
