import { getChapterTitleById } from "@/actions/chapter/chapter";
import { getCourseTitleById } from "@/actions/course/course";
import {
  getLessonDetailsById,
  getLessonTitleById,
} from "@/actions/lesson/lesson";
import Breadcrumb from "@/app/ui-components/breadcrumbs";

import LessonMain from "../_compoenets/lessonMain";

const page = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
    lessonId: string;
    type: string;
  };
}) => {
  const courseTtile = await getCourseTitleById(params.courseId);
  const chapterTitle = await getChapterTitleById(params.chapterId);
  const lessonTitle = await getLessonTitleById(params.lessonId);

  const list = [
    {
      name: courseTtile,
      url: `/course/${params.courseId}`,
      current: false,
    },
    {
      name: chapterTitle,
      url: `/course/${params.courseId}/chapter/${params.chapterId}`,
      current: false,
    },
    {
      name: lessonTitle?.title,
      url: `/course/${params.courseId}/chapter/${params.chapterId}/lesson/${params.lessonId}`,
      current: true,
    },
  ];

  return (
    <section className="max-h-screen">
      <Breadcrumb listofLinks={list} />
      <div className="container mx-auto p-4">
        <LessonMain lessonId={params.lessonId} />
      </div>
    </section>
  );
};

export default page;
