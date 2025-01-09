"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getSpecificTraing } from "@/actions/training/training";
import { Session } from "@prisma/client";
import { addNewApplication } from "@/actions/session/session";
import { FormError } from "@/app/(auth)/login/_compoenets/Form-error";
import { FormSucces } from "@/app/(auth)/login/_compoenets/Form-succes";
import Planingsession from "../[trainingId]/_compoenets/planning";

// type Trainer = {
//   id: string;
//   name: string;
//   // Add other trainer properties as needed
// };

// type Session = {
//   id: string;
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   trainers: Trainer[];
// };

// type Training = {
//   id: string;
//   title: string;
//   description: string;
//   program: string;
//   duration: string;
//   difficulty: string;
//   image: string | null;
//   tags: string[];
//   category: string[];
//   sessions: Session[];
// };

interface Props {
  training: Awaited<ReturnType<typeof getSpecificTraing>>;
}

export default function TrainingSessionDisplay({ training }: Props) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(
    training?.Session[0] || null
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const handelRegister = async () => {
    setError(null);
    setSuccess(null);
    const response = await addNewApplication(selectedSession?.id!);
    if (response.error) {
      setError(response.error);
      return;
    }
    if (response.success) setSuccess(response.success);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{training?.title}</CardTitle>
            <CardDescription>{training?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {training?.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={training.image}
                    alt={training.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
              <p>
                <strong>Program:</strong> {training?.program}
              </p>
              <p>
                <strong>Duration:</strong> {training?.duration}
              </p>
              <p>
                <strong>Difficulty:</strong> {training?.difficulty}
              </p>
              <div className="flex flex-wrap gap-2">
                {training?.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {training?.category.map((cat, index) => (
                  <Badge key={index} variant="outline">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            {error && <FormError message={error} />}
            {success && <FormSucces message={success} />}
            <CardTitle>Sessions</CardTitle>
            <CardDescription>Select a session to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              onValueChange={(value) =>
                setSelectedSession(
                  training?.Session.find((s) => s.id === value) || null
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedSession?.title} />
              </SelectTrigger>
              <SelectContent>
                {training?.Session.map((session) => (
                  <SelectItem key={session.id} value={session.id}>
                    {session.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedSession && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">
                  {selectedSession.title}
                </h3>
                <p>{selectedSession.description}</p>
                <h4 className="font-semibold mb-2">Session Dates</h4>

                <span className="text-gray-600">
                  This session will be held on the following date:
                </span>
                <div className="space-y-2 flex flex-col">
                  <span>
                    <strong>Start Date:</strong>{" "}
                    {formatDate(new Date(selectedSession.startDate))} at{" "}
                    {formatTime(new Date(selectedSession.startDate))}
                  </span>

                  <span>
                    <strong>End Date:</strong>{" "}
                    {formatDate(new Date(selectedSession.endDate))} at{" "}
                    {formatTime(new Date(selectedSession.endDate))}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Trainers:</h4>
                  <span className="text-gray-600">
                    This session is presented by the following trainers:
                  </span>
                  <ul className="list-disc pl-5">
                    {/* @ts-ignore */}
                    {selectedSession.formateurs.map((trainer) => (
                      <li key={trainer.id}>{trainer.user.email}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
          <div className="flex justify-end p-4">
            <button
              type="button"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={handelRegister}
              disabled={!selectedSession}
            >
              Register
            </button>
          </div>
        </Card>
      </div>
      {/* @ts-ignore */}
      <Planingsession inititalPlaning={selectedSession?.SessionPlaning} />
    </div>
  );
}
