"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/app/schemas";
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

export default function Addtrainerform() {
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [cv, setCv] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");

  const handelImageChange = (url: string) => {
    setImage(url);
    form.setValue("profilePhoto", url);
  };

  //   const handelCvChange = (url: string) => {
  //     setCv(url);
  //     form.setValue("cv", url);
  //   };

  //   const handleSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const specialtiesArray = e.target.value.split(",").map((s) => s.trim());
  //     setSpecialties(specialtiesArray);
  //   };

  const handleSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSucces("");

    startTransition(() => {
      register(data).then((result) => {
        setError(result?.error);
        setSucces(result?.success);
        form.reset();
        setImage("");
        setCv("");
      });
    });
  };

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      cinNumber: "",
      profilePhoto: "",
      cv: "",
      password: "",
      role: "STUDENT",
      specialty: [],
    },
  });

  return (
    <Card className="w-full max-w-4xl mx-auto items-center h-[600px] overflow-y-auto">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 p-4"
          >
            <h1 className="text-2xl font-bold mb-6 text-center">
              Create New Formateur
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadImageForRegistartion
                onImageChange={handelImageChange}
                initialImage=""
              />
            </div>

            <div className="">
              <Button type="submit" variant={"primary"} className="w-full">
                Create User
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
