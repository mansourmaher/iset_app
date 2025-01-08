"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { getAllFormateurs } from "@/actions/admin/admin";
import {
  addnewssesion,
  getSpecificSession,
  updatesession,
} from "@/actions/session/session";
import { useForm } from "react-hook-form";
import { SessionSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/app/(auth)/login/_compoenets/Form-error";
import { FormSucces } from "@/app/(auth)/login/_compoenets/Form-succes";
import { z } from "zod";

interface NewSessionFormProps {
  FORMATEURS: Awaited<ReturnType<typeof getAllFormateurs>>;
  session: Awaited<ReturnType<typeof getSpecificSession>>;
}

export default function Editsession({
  FORMATEURS,
  session,
}: NewSessionFormProps) {
  const trainingId = session.session?.trainingId;
  const router = useRouter();
  const formateursAffected = session.session?.formateurs.map(
    (formateur) => formateur.user.id
  );
  const [selectedFormateurs, setSelectedFormateurs] = useState<string[]>(
    formateursAffected || []
  );
  const [er, setEr] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const formateursIds = session.session?.formateurs.map(
    (formateur) => formateur.id
  );
  console.log("foem", session.session?.formateurs);
  console.log("formateursIds", selectedFormateurs);

  const form = useForm<z.infer<typeof SessionSchema>>({
    resolver: zodResolver(SessionSchema),
    defaultValues: {
      title: session.session?.title,
      description: session.session?.description,
      startDate: session.session?.startDate?.toISOString().slice(0, 16),
      endDate: session.session?.endDate?.toISOString().slice(0, 16),
      formateurs: selectedFormateurs,
    },
  });

  const handleSubmit = async (data: z.infer<typeof SessionSchema>) => {
    setEr("");
    setSuccess("");

    if (new Date(data.startDate).getTime() > new Date(data.endDate).getTime()) {
      setEr("End date must be greater than start date");
      return;
    }
    // console.log("form", form.getValues("formateurs"));

    form.setValue("startDate", new Date(data.startDate).toISOString());
    form.setValue("endDate", new Date(data.endDate).toISOString());

    const response = await updatesession(
      data,
      session.session?.id!,
      selectedFormateurs
    );

    if (response.error) setEr(response.error);
    if (response.success) setSuccess(response.success);
  };

  const handleFormateurSelect = (formateurId: string) => {
    if (selectedFormateurs.includes(formateurId)) return;
    setSelectedFormateurs((prev) => [...prev, formateurId]);

    console.log("selectedFormateurs", selectedFormateurs);
    form.setValue("formateurs", selectedFormateurs);
  };
  const handelRemoveformateur = (id: string) => {
    const newTab = selectedFormateurs.filter((forma) => forma !== id);
    setSelectedFormateurs(newTab);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Edit Session
        </CardTitle>

        {er && <FormError message={er} />}
        {success && <FormSucces message="Session updated successfully" />}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter title" />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="formateurs"
              render={() => (
                <FormItem>
                  <FormLabel>Formateurs</FormLabel>
                  <Select onValueChange={handleFormateurSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select formateurs" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* @ts-ignore */}
                      {FORMATEURS?.map((formateur) => (
                        <SelectItem key={formateur.id} value={formateur.id}>
                          {formateur.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFormateurs.map((formateurId) => {
                      // @ts-ignore
                      const formateur = FORMATEURS?.find(
                        // @ts-ignore
                        (f) => f.id === formateurId
                      );
                      return (
                        <Badge key={formateurId} variant="secondary">
                          {formateur?.email}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0"
                            onClick={() => handelRemoveformateur(formateurId)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              className="w-full"
              variant="primary"
              onClick={() => handleSubmit(form.getValues())}
            >
              Update Session
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
