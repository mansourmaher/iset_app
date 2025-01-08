import React from "react";
import CourseBreadCrumbs from "../../../_compoenets/courseBreadcrumb";
import { getCourseTitleById } from "@/actions/course/course";
import { getChapterTitleById } from "@/actions/chapter/chapter";
import { url } from "inspector";

const page = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const courseTitle = await getCourseTitleById(params.courseId);
  const chapterTitle = await getChapterTitleById(params.chapterId);

  const links = [
    {
      name: courseTitle,
      url: `/course/${params.courseId}`,
      current: false,
    },
    {
      name: chapterTitle,
      url: `/course/${params.courseId}/chapter/${params.chapterId}`,
      current: true,
    },
  ];

  return <CourseBreadCrumbs listofLinks={links} />;
};

export default page;
