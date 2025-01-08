"use client";

import {
  Book,
  ChevronDown,
  FileText,
  Play,
  PlayCircle,
  ScrollText,
  Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
import ChapterContent from "@/app/(formateur)/formateur/create/[formationId]/module/_module_compoenets/ChapterContent";
import ChaptersContent from "./chaptersContent";

interface CourseModuleProps {
  courseTitle: string | undefined;
  courseDescrpeiton: string | undefined;
  chapterss: Awaited<ReturnType<typeof getCourseByIdForLearnPage>> | undefined;
  image: string | undefined;
  courseId: string;
}

export default function CourseModule({
  courseTitle,
  courseDescrpeiton,
  chapterss,
  image,
  courseId,
}: CourseModuleProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <div className="prose dark:prose-invert">
            <h1 className="text-3xl font-bold">{courseTitle}</h1>
            <p className="text-sm text-slate-500">{courseDescrpeiton}</p>
          </div>

          <ChaptersContent chapterss={chapterss} />
        </div>

        <Card className="h-fit lg:sticky lg:top-6">
          <CardContent className="p-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={image!}
                alt="Course thumbnail"
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 space-y-4 space-x-2">
              <Link href={`/course/${courseId}`}>
                <Button className="w-full gap-x-2" variant={"primary"}>
                  Continue Learning
                  <Play className="w-3 h-3 " />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
