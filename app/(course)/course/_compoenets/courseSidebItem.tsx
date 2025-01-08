import { getAllchaptersPerCourse } from "@/actions/chapter/chapter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, PlayCircle, ShieldQuestion } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  chapters: Awaited<ReturnType<typeof getAllchaptersPerCourse>>;
  courseId: string;
  existingpurchase: boolean;
}

function CourseSidebItem({ chapters, courseId, existingpurchase }: Props) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const isItemSelected = (lessonId: string) => {
    return selectedItem === lessonId;
  };

  return (
    <div className="space-y-4 p-2 w-full">
      {chapters?.map((chapterItem) => (
        <Card className="lg:w-72" key={chapterItem.id}>
          <div className="p-4 border-b">
            <h2 className="font-semibold text-center underline">
              {chapterItem.title}
            </h2>
          </div>
          <ScrollArea className="h-[calc(100%-60px)] p-2">
            <div className="space-y-4">
              {chapterItem.lessons.map((lesson) => (
                <div
                  className="space-y-2"
                  key={`${chapterItem.id}-${lesson.id}`}
                >
                  <div className="flex items-center gap-2 text-sm text-blue-400 pb-2">
                    {lesson.video && (
                      <>
                        <PlayCircle className="h-4 w-4" />
                        <span>Video</span>
                      </>
                    )}
                  </div>
                  <Link
                    href={`/course/${courseId}/chapter/${chapterItem.id}/lesson/${lesson.id}?type=video`}
                  >
                    <Button
                      disabled={!existingpurchase}
                      className={cn(
                        isItemSelected(lesson.id)
                          ? "bg-indigo-700 text-white hover:text-white font-bold"
                          : "hover:bg-indigo-700 hover:text-white bg-slate-100 ",
                        "w-full justify-start  h-auto py-2 border-indigo-700 border-l-2 border-b-2 "
                      )}
                      onClick={() =>
                        setSelectedItem(
                          isItemSelected(lesson.id) ? null : lesson.id
                        )
                      }
                    >
                      <div className="whitespace-pre-line">
                        <div>{lesson.title}</div>
                      </div>
                    </Button>
                  </Link>
                  <div>
                    {/* <div className="ml-6 space-y-2">
                      {lesson.resources.map((resource) => (
                        <div className="space-y-2" key={resource.id}>
                          <div className="flex items-center gap-2 text-sm   mb-2">
                            <>
                              <FileText className="h-4 w-4" />
                              <span>Reading</span>
                            </>
                          </div>
                          <Link
                            href={`/course/${courseId}/chapter/${chapterItem.id}/lesson/${lesson.id}?res=${resource.id}&type=pdf`}
                          >
                            <Button
                              disabled={!existingpurchase}
                              className={cn(
                                selectedItem === resource.id
                                  ? "bg-indigo-700 text-white hover:text-white font-bold"
                                  : "hover:bg-indigo-700 hover:text-white bg-slate-100",
                                "w-full justify-start  h-auto py-2 border-indigo-700 border-l-2 border-b-2  "
                              )}
                              onClick={() => setSelectedItem(resource.id)}
                            >
                              <div className="whitespace-pre-line">
                                <div className="text-sm">{lesson.title}</div>
                              </div>
                            </Button>
                          </Link>
                        </div>
                      ))}
                      {lesson.Quiz.length > 0 &&
                        lesson.Quiz.map((quiz) => (
                          <div className="space-y-4 " key={quiz.id}>
                            <div className="flex items-center gap-2 text-sm  mb-2 text-yellow-400">
                              <ShieldQuestion className="h-4 w-4" />
                              <span>Quiz</span>
                            </div>
                            <Link
                              href={`/course/${courseId}/chapter/${chapterItem.id}/lesson/${lesson.id}?type=quiz`}
                            >
                              <Button
                                disabled={!existingpurchase}
                                className={cn(
                                  selectedItem === lesson.id
                                    ? "bg-indigo-700 text-white hover:text-white font-bold"
                                    : "hover:bg-indigo-700 hover:text-white bg-slate-100 ",
                                  "w-full justify-start  h-auto py-2 border-indigo-700 border-l-2 border-b-2  "
                                )}
                                onClick={() => setSelectedItem(lesson.id)}
                              >
                                <div className=" whitespace-pre-line">
                                  <div>quiz</div>
                                </div>
                              </Button>
                            </Link>
                          </div>
                        ))}
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      ))}
    </div>
  );
}

export default CourseSidebItem;

{
  /* <div className="ml-6 space-y-2">
                {lesson.resources.map((resource) => (
                  <div className="space-y-2" key={resource.id}>
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                      <>
                        <FileText className="h-4 w-4" />
                        <span>Reading:</span>
                      </>
                    </div>
                    <Link
                      href={`/course/${courseId}/chapter/${chapterItem.id}/lesson/${lesson.id}`}
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          selectedItem === resource.id
                            ? "border-indigo-700 text-indigo-700 border-l-2 hover:text-indigo-700"
                            : "hover:bg-indigo-700 hover:text-white",
                          "w-full justify-start  h-auto py-2"
                        )}
                        onClick={() => setSelectedItem(resource.id)}
                      >
                        <div className=" whitespace-pre-line">
                          <div>{lesson.title}</div>
                          <div className="text-xs text-muted-foreground">
                            5 min
                          </div>
                        </div>
                      </Button>
                    </Link>
                  </div>
                ))}
                {lesson.Quiz.length > 0 &&
                  lesson.Quiz.map((quiz) => (
                    <div className="space-y-2" key={quiz.id}>
                      <div className="flex items-center gap-2 text-sm text-blue-600 font-medium ">
                        <ShieldQuestion className="h-4 w-4" />
                        <span>Quiz:</span>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start  h-auto py-2  hover:bg-indigo-700 hover:text-white"
                      >
                        <div className=" whitespace-pre-line">
                          <div>quiz</div>
                          <div className="text-xs text-muted-foreground">
                            5 min
                          </div>
                        </div>
                      </Button>
                    </div>
                  ))}
              </div> */
}
