import { getAllchaptersPerCourse } from "@/actions/chapter/chapter";
import React from "react";
import CourseSidbar from "./courseSidebar";
import { existpurchase } from "@/actions/courseuser/courseuser";

interface Props {
  courseId: string;
}

const CourseSidbearFetchData = async ({ courseId }: Props) => {
  const chapters = await getAllchaptersPerCourse(courseId);
  const exisintingpurchase = await existpurchase(courseId);

  return (
    <CourseSidbar
      chapters={chapters}
      courseId={courseId}
      existingpurchase={exisintingpurchase!}
    />
  );
};

export default CourseSidbearFetchData;
