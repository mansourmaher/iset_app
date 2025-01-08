import {
  Book,
  ChevronDownIcon,
  FileText,
  PlayCircle,
  Timer,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCourseByIdForLearnPage } from "@/actions/course/course";

interface ChaptersProps {
  chapterss: Awaited<ReturnType<typeof getCourseByIdForLearnPage>> | undefined;
}

function ChaptersContent({ chapterss }: ChaptersProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* @ts-ignore */}
      {chapterss?.map((chapter, index) => (
        <AccordionItem
          value={`chapter-${index}`}
          key={index}
          className="mb-4 mt-4"
        >
          <AccordionTrigger className="hover:no-underline flex justify-between ">
            <p className="font-bold">{chapter.title}</p>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {chapter.lessons.length} Lessons
            </span>

            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Details
              <ChevronDownIcon className="h-4 w-4" />
            </span>
          </AccordionTrigger>
          <AccordionContent className="">
            <div className="mt-4 space-y-4">
              {/* @ts-ignore */}
              {chapter.lessons.map((lesson, lessonIndex) => (
                <Card key={lessonIndex} className="">
                  <CardContent className="grid grid-cols-2 gap-1 p-4 ">
                    <div className="col-span-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {lesson.video ? (
                            <PlayCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <Book className="h-5 w-5 text-primary" />
                          )}
                          <h3 className="font-medium">{lesson.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Timer className="h-4 w-4" />
                            {/* {lesson.duration} */} 20 min
                          </div>
                          {lesson.Quiz.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              Quiz
                            </Badge>
                          )}
                          {lesson.assignments.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              Assignment
                            </Badge>
                          )}
                        </div>
                        {lesson.resources.length > 0 && (
                          <div className="pt-4 grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 ">
                            {/* @ts-ignore */}
                            {lesson.resources.map((resource, resourceIndex) => (
                              <Button
                                key={resourceIndex}
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs"
                              >
                                <FileText className="mr-1 h-3 w-3" />
                                {resource.title}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      {lesson.hasPreview && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="shrink-0"
                        >
                          Preview
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default ChaptersContent;
