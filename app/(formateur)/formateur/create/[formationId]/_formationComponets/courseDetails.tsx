"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/lib/uploadthing";
import UploadCourseImagecompoenet from "./uploadCourseImagecompoenet";
import { getCourseById, updateCourseDetail } from "@/actions/course/course";
import { useState } from "react";

interface courseDetailProps {
  courseDetail: Awaited<ReturnType<typeof getCourseById>>;
}

function CourseDetails({ courseDetail }: courseDetailProps) {
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    title: z
      .string()
      .min(1, { message: "Please provide a valid title" })
      .max(50, { message: "Title is too long" }),
    descreption: z
      .string()
      .min(1, { message: "Please provide a valid description" })
      .max(500, { message: "Description is too long" }),
    imageUrl: z.string(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: courseDetail?.title,
      descreption: courseDetail?.description,
      imageUrl: courseDetail?.image,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setIsLoading(true);
      await updateCourseDetail(courseDetail!.id, values);
      setIsLoading(false);
    } catch {}
  };
  const onImageChange = (imageUrl: string) => {
    form.setValue("imageUrl", imageUrl);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Course Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormLabel htmlFor="title">Course Title</FormLabel>
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
                          disabled={isSubmitting}
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
              <FormLabel htmlFor="title">Course Description</FormLabel>
              <FormField
                control={form.control}
                name="descreption"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="e.g. Learn the basics of programming with this beginner-friendly course"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      {!form.formState.errors.descreption?.message && (
                        <FormDescription>
                          A detailed description will help students understand
                          what they will learn
                        </FormDescription>
                      )}

                      <FormMessage>
                        {form.formState.errors.descreption?.message}
                      </FormMessage>
                    </FormItem>
                  );
                }}
              />
            </div>
          </form>
        </Form>
        <UploadCourseImagecompoenet
          initialImageUrl={courseDetail?.image}
          onImageChange={onImageChange}
        />
      </CardContent>
      <CardFooter>
        <Button
          className="ml-auto"
          variant={"primary"}
          size={"sm"}
          disabled={!isValid || isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CourseDetails;
