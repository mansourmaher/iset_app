"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Upload, Video } from "lucide-react";
import { Editor } from "@/app/ui-components/editor";
import { getLessonById, updateLessonContent } from "@/actions/lesson/lesson";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import UploadLessonVideo from "./UploadLessonVideo";
import { Textarea } from "@/components/ui/textarea";

interface LessonContentProps {
  lessonData: Awaited<ReturnType<typeof getLessonById>>;
}

function ChapterContent({ lessonData }: LessonContentProps) {
  const schema = z.object({
    title: z
      .string()
      .min(0, { message: "Please provide a title for the lesson" }),
    description: z.string().min(0, {
      message: "Please provide a description for the lesson",
    }),
    video: z.string(),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: lessonData?.title!,
      description: lessonData?.description!,
      video: lessonData?.video!,
    },
  });
  const onVideoChange = (url: string) => {
    form.setValue("video", url);
  };
  const { isValid, isSubmitting } = form.formState;
  const onSubmite = async (values: z.infer<typeof schema>) => {
    await updateLessonContent(values, lessonData?.id!);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lesson Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmite)}>
            <div className="space-y-2">
              <FormLabel htmlFor="title">Lesson Title</FormLabel>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. Introduction to programming"
                        />
                      </FormControl>
                      {!form.formState.errors.title?.message && (
                        <FormDescription>
                          A compelling title will attract more students
                        </FormDescription>
                      )}

                      <FormMessage>
                        {form.formState.errors.title?.message}
                      </FormMessage>
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="space-y-2">
              <FormLabel htmlFor="title">Lesson descreption</FormLabel>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        {/* @ts-ignore */}
                        <Textarea
                          {...field}
                          placeholder="e.g. Introduction to programming"
                        />
                      </FormControl>
                      {!form.formState.errors.description?.message && (
                        <FormDescription>
                          A compelling title will attract more students
                        </FormDescription>
                      )}

                      <FormMessage>
                        {form.formState.errors.description?.message}
                      </FormMessage>
                    </FormItem>
                  );
                }}
              />
            </div>
          </form>
        </Form>

        <UploadLessonVideo
          initialVideoUrl={lessonData?.video}
          onVideoChange={onVideoChange}
        />
        <div className="flex justify-end mt-4">
          <Button
            variant="primary"
            size={"sm"}
            onClick={form.handleSubmit(onSubmite)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader className="animate-spin"></Loader>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChapterContent;
