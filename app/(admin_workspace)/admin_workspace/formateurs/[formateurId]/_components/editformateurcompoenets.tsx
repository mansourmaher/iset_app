"use client";
import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema, UpdateFormateur } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import UploadImageForRegistartion from "@/app/(auth)/sign-up/_components/uplaodImage";
import UploadCvForRegistartion from "@/app/(auth)/sign-up/_components/uploadcv";
import { FormError } from "@/app/(auth)/login/_compoenets/Form-error";
import { FormSucces } from "@/app/(auth)/login/_compoenets/Form-succes";
import { register } from "@/actions/auth/register";
import { getFormateur, updateFormateur } from "@/actions/trainer/trainer";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Props {
  formateurr: Awaited<ReturnType<typeof getFormateur>>;
}

export default function EditFormateurForm({ formateurr }: Props) {
 
  const formateur = formateurr.user;
  
  const [specialties, setSpecialties] = useState<string[] |undefined>(formateur?.specialty);
  const [image, setImage] = useState<string | null |undefined>(formateur?.photo);
  const [cv, setCv] = useState<string | null |undefined>(formateur?.cv);
  const [error, setError] = useState<string | null>("");
  const [succes, setSucces] = useState<string | undefined>("");

  const handelImageChange = (url: string) => {
    setImage(url);
    form.setValue("profilePhoto", url);
  };

  const handelCvChange = (url: string) => {
    setCv(url);
    form.setValue("cv", url);
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const specialtiesArray = e.target.value.split(",").map((s) => s.trim());
    setSpecialties(specialtiesArray);
  };

  const handleSubmit = (data: z.infer<typeof UpdateFormateur>) => {
    setError("");
    setSucces("");
    data.specialty = specialties;
    form.setValue("specialty", specialties);

    startTransition(() => {
      updateFormateur(data, formateur?.id!).then((result) => {
        setError(result?.error);
        setSucces(result?.success);
      });
    });
    if (succes) window.location.reload();
  };

  const form = useForm<z.infer<typeof UpdateFormateur>>({
    resolver: zodResolver(UpdateFormateur),
    defaultValues: {
      firstname: formateur?.name,
      lastname: formateur?.lastName,

      phoneNumber: formateur?.number!,
      cinNumber: formateur?.cinNumber!,

      role: "FORMATEUR",
      specialty: formateur?.specialty,
    },
  });

  const handelRemovespec = (
    spec: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const newspec = specialties?.filter((s) => s !== spec);
    setSpecialties(newspec);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto items-center h-[600px] overflow-hidden">
      <CardContent className="h-full overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 p-4"
          >
            <h1 className="text-2xl font-bold mb-6 text-center">
              Edit Formateur
            </h1>
            {error && <FormError message={error} />}
            {succes && <FormSucces message={succes} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="First Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Last Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={formateur?.email} disabled />
              </div>

              <FormField
                control={form.control}
                name="cinNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CIN Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="CIN Number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Phone Number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Specialties (comma-separated)</FormLabel>
                <span className="text-slate-500 text-sm "> (optional)</span>

                <FormControl>
                  <Input
                    value={specialties?.join(", ")}
                    onChange={handleSpecialtyChange}
                    placeholder="Enter specialties"
                  />
                </FormControl>
                <div className="flex flex-wrap gap-2 mt-2">
                  {specialties?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-4 w-4 p-0"
                        onClick={(e) => handelRemovespec(tag, e)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </FormItem>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadImageForRegistartion
                onImageChange={handelImageChange}
                initialImage={image}
              />
              <UploadCvForRegistartion
                onCvChange={handelCvChange}
                // @ts-ignore
                initialCv={cv}
              />
            </div>

            <div className="">
              <Button type="submit" variant={"primary"} className="w-full">
                Edit Formateur
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
