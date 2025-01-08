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
import { addnewssesion } from "@/actions/session/session";
import { useForm } from "react-hook-form";
import { SessionSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormMessage } from "@/components/ui/form";
import { FormError } from "@/app/(auth)/login/_compoenets/Form-error";
import { FormSucces } from "@/app/(auth)/login/_compoenets/Form-succes";

interface NewSessionFormProps {
  trainingId: string;
  FORMATEURS: Awaited<ReturnType<typeof getAllFormateurs>>;
}

export default function NewSessionForm({
  trainingId,
  FORMATEURS,
}: NewSessionFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFormateurs, setSelectedFormateurs] = useState<string[]>([]);
  const [er, setEr] = useState<string | undefined>("");
  const [formateurerror, setFormateurError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SessionSchema>>({
    resolver: zodResolver(SessionSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      formateurs: [],
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEr("");
    setSuccess("");

    if (selectedFormateurs.length === 0) {
      setEr("Please select at least one formateur");
      return;
    }
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
      setEr("End date must be greater than start date");
      return;
    }

    const response = await addnewssesion({
      trainingId,
      title,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),

      formateurs: selectedFormateurs,
    });
    if (response.error) setEr(response.error);
    if (response.success) setSuccess(response.success);
  };

  const handleFormateurSelect = (formateurId: string) => {
    setSelectedFormateurs((prev) =>
      prev.includes(formateurId)
        ? prev.filter((id) => id !== formateurId)
        : [...prev, formateurId]
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create New Session
        </CardTitle>
        {er && <FormError message={er} />}
        {success && <FormSucces message="Session created successfully" />}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="formateurs">Formateurs</Label>
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
                const formateur = FORMATEURS?.find((f) => f.id === formateurId);
                return (
                  <Badge key={formateurId} variant="secondary">
                    {formateur?.email}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-4 w-4 p-0"
                      onClick={() => handleFormateurSelect(formateurId)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
            {form.formState.errors.formateurs && (
              <FormMessage>
                {form.formState.errors.formateurs.message}
              </FormMessage>
            )}
          </div>

          <Button type="submit" className="w-full" variant={"primary"}>
            Create Session
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
