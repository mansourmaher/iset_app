import VideoLesson from "./videoLesson";
import { Suspense } from "react";
import { getLessonDetailsById } from "@/actions/lesson/lesson";

interface LessonMainProps {
  lessonId: string;
}

const LessonMain = async ({ lessonId }: LessonMainProps) => {
  const lessonDetails = await getLessonDetailsById(lessonId);

  return (
    <Suspense>
      {!lessonDetails && <>error while fetching lesson</>}

      <VideoLesson
        video={lessonDetails?.video!}
        descreption={lessonDetails?.description!}
        title={lessonDetails?.title}
        lessonId={lessonId}
      />

      {/* {type === "pdf" && <PdfLesson res={resources} />}
      {type === "quiz" && <QuizLesson />} */}
    </Suspense>
  );
};

export default LessonMain;
