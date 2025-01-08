import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Pencil } from "lucide-react";
import { QuizModel } from "./AddQuizForm";
import { getAllQuizBylesson } from "@/actions/lesson/lesson";
import QuizPreview from "./QuizPreview";

interface ChapterQuizProps {
  lessonId: string;
  initialQuiz?: Awaited<ReturnType<typeof getAllQuizBylesson>>;
}

function ChapterQuiz({ lessonId, initialQuiz }: ChapterQuizProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between ">
          <p>Chapter Quiz</p>
          <QuizPreview initialQuiz={initialQuiz} />
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">Chapter Quiz</h3>
            <p className="text-sm text-muted-foreground">
              You chapter quiz is not ready yet
            </p>
          </div>
          <QuizModel lessonId={lessonId} />
        </div>
      </CardContent>
    </Card>
  );
}

export default ChapterQuiz;
