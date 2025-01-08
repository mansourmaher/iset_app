import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChapterContent from "../_module_compoenets/ChapterContent";
import ChapterSeeting from "../_module_compoenets/ChapterSeeting";
import ChapterQuiz from "../_module_compoenets/ChapterQuiz";
import ChapterResource from "../_module_compoenets/ChapterResource";
import {
  getAllQuizBylesson,
  getAllresourcesPerLesson,
  getLessonById,
} from "@/actions/lesson/lesson";

const LessonPage = async ({
  params,
}: {
  params: { formationId: string; moduleId: string };
}) => {
  const { formationId, moduleId } = params;
  const lesson = await getLessonById(moduleId);
  const resources = await getAllresourcesPerLesson(moduleId);
  const quizes=await getAllQuizBylesson(moduleId)

  return (
    <div className="px-12 mx-auto py-6 space-y-8 mt-12">
      <div className="flex justify-between items-center"></div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChapterContent lessonData={lesson} />
        </div>
        <div className="space-y-6">
          <ChapterSeeting visibility={lesson?.private} prerequisites=""lessonId={moduleId} />
          <ChapterQuiz lessonId={moduleId} initialQuiz={quizes} />
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Chapter Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Last updated 2 hours ago
                  </p>
                </div>
                <Badge variant="outline" className="text-primary">
                  Draft
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3 ">
          <ChapterResource resourcess={resources!} lessonId={moduleId} />
        </div>
      </div>
    </div>
  );
};
export default LessonPage;
