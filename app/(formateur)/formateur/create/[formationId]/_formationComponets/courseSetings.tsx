"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { getCourseById, updateCourseSeting } from "@/actions/course/course";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CourseSetingsProps {
  courseDetail: Awaited<ReturnType<typeof getCourseById>>;
}

function CourseSetings({ courseDetail }: CourseSetingsProps) {
  const schema = z.object({
    price: z.number().min(0, { message: "Price must be greater than 0" }),
    level: z.string().min(1, { message: "Please select a level" }),
    category: z.string().min(1, { message: "Please select a category" }),
    certificate: z.boolean(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: courseDetail?.price,
      level: courseDetail?.level!,
      category: courseDetail?.category!,
      certificate: courseDetail?.certificate,
    },
  });

  const onsubmit = async (values: z.infer<typeof schema>) => {
    await updateCourseSeting(courseDetail?.id!, values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Course Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
            {/* Price Field */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">$</span>
                        <Input
                          id="price"
                          type="number"
                          className="pl-7"
                          placeholder="99.99"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.price?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Separator />

            {/* Difficulty Level Field */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="level">Difficulty Level</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={courseDetail?.level!}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.level?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Separator />

            {/* Category Field */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={courseDetail?.category!}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="programming">
                            Programming
                          </SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.category?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Separator />

            {/* Certificate Field */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel htmlFor="certificate">Offer Certificate</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Students can earn a certificate upon completion
                </p>
              </div>
              <FormField
                control={form.control}
                name="certificate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        id="certificate"
                        onCheckedChange={field.onChange}
                        checked={field.value}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.certificate?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          className="ml-auto"
          variant="primary"
          size="sm"
          onClick={form.handleSubmit(onsubmit)}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CourseSetings;
