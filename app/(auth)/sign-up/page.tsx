"use client";
import Link from "next/link";
import { SelectField } from "../../_landingPageComponents/Fields";
import { Logo } from "../../_landingPageComponents/Logo";
import { SlimLayout } from "../../_landingPageComponents/SlimLayout";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RegisterSchema } from "@/app/schemas";
import { register } from "@/actions/auth/register";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSucces } from "../login/_compoenets/Form-succes";
import UploadImageForRegistartion from "./_components/uplaodImage";
import UploadCvForRegistartion from "./_components/uploadcv";
import { ArrowLeft } from "lucide-react";
import { FormError } from "../login/_compoenets/Form-error";

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [role, setRole] = useState<string | undefined>("STUDENT");
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | undefined>("");
  const [cv, setCv] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cv: "",
      profilePhoto: "",
      role: "STUDENT",
      cinNumber: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((result) => {
        setError(result?.error);
        setSuccess(result?.succes);
      });
    });
  };
  const onImageChange = (url: string) => {
    setImage(url);
    form.setValue("profilePhoto", url);
  };
  const onCvChange = (url: string) => {
    setCv(url);
    //
    form.setValue("cv", url);
  };

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Get started for free
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>{" "}
        to your account.
      </p>
      <div className="pt-4">
        {" "}
        <FormSucces message={success} />
        <FormError message={error} />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
        >
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="first name">First name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        name="first_name"
                        type="text"
                        autoComplete="given-name"
                        required
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.firstname?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="lastname">Last name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" required />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.lastname?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="col-span-full"
                        type="email"
                        required
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="col-span-full"
                        type="password"
                        required
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <SelectField
                className="col-span-full"
                label="how are you"
                defaultValue={role}
                name="role"
                onChange={(e) => {
                  setRole(e.target.value);
                  //@ts-ignore
                  form.setValue("role", e.target.value);
                }}
              >
                <option value="STUDENT">Student</option>
                <option value="FORMATEUR">Formateur</option>
              </SelectField>
              <div className="col-span-full">
                <Button
                  type="button"
                  className="w-full cursor-pointer"
                  variant="primary"
                  onClick={() => setStep(2)}
                >
                  <span>
                    Next <span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="cinNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="Cin number">Cin Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        name="cinNumber"
                        type="number"
                        required
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.cinNumber?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phone number">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        required
                        name="phoneNumber"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.phoneNumber?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <UploadImageForRegistartion
                onImageChange={onImageChange}
                initialImage={image}
              />
              {form.getValues("role") === "FORMATEUR" && (
                <UploadCvForRegistartion
                  onCvChange={onCvChange}
                  initialCv={cv}
                />
              )}
              <div className="col-span-full flex gap-x-4">
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  variant="secondary"
                  onClick={() => setStep(1)}
                >
                  <span className="flex items-center gap-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </span>
                </Button>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  variant="primary"
                  disabled={isPending}
                >
                  <span>
                    Sign up <span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </SlimLayout>
  );
}
