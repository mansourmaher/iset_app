"use client";
import {
  addChapters,
  getAllchaptersPerCourse,
} from "@/actions/chapter/chapter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Lesson {
  id?: string;
  title: string;
}

interface Chapter {
  id?: string;
  title: string;
  lessons: Lesson[];
}

interface CourseContentProps {
  chaptersData: Awaited<ReturnType<typeof getAllchaptersPerCourse>>;
  courseId: string;
}

function CourseContent({ chaptersData, courseId }: CourseContentProps) {
  const router = useRouter();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chaptersData) {
      setChapters(chaptersData);
      console.log(chaptersData);
    }
  }, [chaptersData]);

  const addChapter = () => {
    setChapters([...chapters, { title: "", lessons: [] }]);
  };

  const addLesson = (chapterIndex: number) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].lessons.push({ title: "" });
    setChapters(updatedChapters);
  };

  const handleChapterTitleChange = (chapterIndex: number, newTitle: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].title = newTitle;
    setChapters(updatedChapters);
  };

  const handleLessonTitleChange = (
    chapterIndex: number,
    lessonIndex: number,
    newTitle: string
  ) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].lessons[lessonIndex].title = newTitle;
    setChapters(updatedChapters);
  };

  const handleAddChapters = async () => {
    setLoading(true);
    await addChapters(chapters, courseId);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Course Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-4">
              <div className="flex items-center gap-4">
                <DragHandleDots2Icon className="w-5 h-5 text-muted-foreground cursor-move" />
                <div className="flex-1">
                  <Input
                    placeholder={`Chapter ${
                      chapterIndex + 1
                    }: Enter chapter title`}
                    value={chapter.title}
                    onChange={(e) =>
                      handleChapterTitleChange(chapterIndex, e.target.value)
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => addLesson(chapterIndex)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() =>
                    setChapters(chapters.filter((_, i) => i !== chapterIndex))
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {chapter.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="ml-6 flex items-center gap-4">
                  <DragHandleDots2Icon className="w-5 h-5 text-muted-foreground cursor-move" />
                  <div className="flex-1">
                    <Input
                      placeholder={`Lesson ${
                        lessonIndex + 1
                      }: Enter lesson title`}
                      value={lesson.title}
                      onChange={(e) =>
                        handleLessonTitleChange(
                          chapterIndex,
                          lessonIndex,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex gap-x-2">
                    {" "}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => {
                        const updatedChapters = [...chapters];
                        updatedChapters[chapterIndex].lessons = updatedChapters[
                          chapterIndex
                        ].lessons.filter((_, i) => i !== lessonIndex);
                        setChapters(updatedChapters);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-400"
                      onClick={() => {
                        router.push(
                          `/formateur/create/${courseId}/module/${lesson.id}`
                        );
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" size="sm" onClick={addChapter}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Chapter
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={loading}
            onClick={() => handleAddChapters()}
          >
            <Plus className="w-4 h-4 mr-2" />
            {loading ? "Adding Chapters..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseContent;
