"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Recycle, X } from "lucide-react";
import { FormationSchema } from "@/app/schemas";

import {
  addNewTraining,
  getTrainingById,
  updatetraining,
} from "@/actions/training/training";
import { FormSucces } from "@/app/(auth)/login/_compoenets/Form-succes";
import { FormError } from "@/app/(auth)/login/_compoenets/Form-error";
import UplaodProgram from "../../add/_compoenets/uploadprogram";
import UploadImageFortraining from "../../add/_compoenets/uploadImageFortraining";

const CATEGORIES = [
  "Développement Web",
  "Programmation",
  "Design",
  "Marketing Digital",
  "Data Science",
  "Intelligence Artificielle",
  "Cybersécurité",
];

interface Props {
  training: Awaited<ReturnType<typeof getTrainingById>>;
}

export default function Edittraining({ training }: Props) {
  if (!training) return <div>loading...</div>;

  const [prg, setPrg] = useState<string | undefined>(training.program);
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  const [image, setImage] = useState<string | undefined>(
    training.image as string
  );
  const form = useForm<z.infer<typeof FormationSchema>>({
    resolver: zodResolver(FormationSchema),
    defaultValues: {
      title: training.title,
      description: training.description,
      duration: training.duration,
      image: training.image as string,
      program: training.program,
      difficulty: training.difficulty,
      tags: training.tags,
      categories: training.category,
    },
  });

  const handelProgramChange = (url: string) => {
    setPrg(url);
    form.setValue("program", url);
  };
  const handelUploadImage = (url: string) => {
    setImage(url);
    form.setValue("image", url);
  };

  const onSubmit = (values: z.infer<typeof FormationSchema>) => {
    console.log(values);
    if (!prg) {
      form.setError("program", { message: "Please upload a program" });
      return;
    }
    if (!image) {
      form.setError("image", {
        message: "For better user experience please upload an image",
      });
      return;
    }
    setError("");
    setSucces("");
    startTransition(() => {
      updatetraining(values, training.id).then((result) => {
        setError(result?.error);
        setSucces(result?.success);
      });
    });
  };

  const handleAddTag = (currentTag: string) => {
    if (currentTag.trim() && !form.getValues("tags").includes(currentTag)) {
      const updatedTags = [...form.getValues("tags"), currentTag];
      form.setValue("tags", updatedTags);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = form
      .getValues("tags")
      .filter((tag) => tag !== tagToRemove);
    form.setValue("tags", updatedTags);
  };

  const handleAddCategory = (category: string) => {
    const currentCategories = form.getValues("categories");
    if (!currentCategories.includes(category)) {
      const updatedCategories = [...currentCategories, category];
      form.setValue("categories", updatedCategories);
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    const updatedCategories = form
      .getValues("categories")
      .filter((cat) => cat !== categoryToRemove);
    form.setValue("categories", updatedCategories);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto items-center h-[600px] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Edit training
        </CardTitle>
        {succes && <FormSucces message={succes} />}
        {error && <FormError message={error} />}
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter the title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="The title of your training"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter the description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="The description of your training"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter the duration</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        placeholder="Duration (hours)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label htmlFor="program">Programme (PDF)</Label>
                <UplaodProgram
                  onPrgChange={handelProgramChange}
                  initialPrg={prg}
                />
                {form.formState.errors.program && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.program.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="difficulty">
                        Level of Difficulty
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select the level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simple">Simple</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                            <SelectItem value="very-difficult">
                              Very Difficult
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.difficulty?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tag"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag(e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <Select onValueChange={handleAddCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2 space-y-2">
                      {field.value.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0"
                            onClick={() => handleRemoveCategory(category)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <UploadImageFortraining
                initialImageUrl={image}
                onImageChange={handelUploadImage}
              />
              {form.formState.errors.image && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.image.message}
                </p>
              )}
            </div>
            <div className="">
              <Button
                type="submit"
                variant={"primary"}
                className="flex space-x-2 w-full justify-center items-center"
              >
                <Recycle className="h-4 w-4" />
                <span>Edit training</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
