"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import { CheckCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { createCourse } from "@/actions/course/course";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a title",
  }),
});

const CreatePage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Add success state
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      startTransition(() => {
        createCourse(values.title).then((result) => {
          if (result) {
            setIsSuccess(true); // Set success state
            setTimeout(() => {
              router.push(`/formateur/create/${result.id}`);
            }, 2000); // Redirect after animation
          } else {
            setIsLoading(false); // Reset loading state
            toast.error("Something went wrong");
          }
        });
      });
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center mt-48 my-auto p-6">
      <div>
        {!isLoading && !isSuccess && (
          <>
            <h1 className="text-2xl">Create a course and add chapters to it</h1>
            <p className="text-sm text-slate-600">
              Start by giving your course a title and you will be redirected to
              the course editor
            </p>
            <Form {...form}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="e.g. Introduction to programming"
                        />
                      </FormControl>
                      <FormDescription>
                        Give your course a title
                      </FormDescription>
                      <FormMessage>
                        {form.formState.errors.title?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-2">
                  <Link href="/teacher/mycourses">
                    <Button size="sm" type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    variant={"primary"}
                    disabled={!isValid || isSubmitting}
                  >
                    Continue
                  </Button>
                </div>
              </motion.form>
            </Form>
          </>
        )}

        {isLoading && isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center h-full"
          >
            <CheckCircleIcon className="w-24 h-24 text-green-500" />
            <p className="mt-4 text-lg font-semibold">
              Course created successfully!
            </p>
            <span className="text-sm text-slate-600">
              You will be redirected to the course editor in a few seconds
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreatePage;
