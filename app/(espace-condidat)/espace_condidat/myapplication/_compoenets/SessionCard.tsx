"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Book,
  BookOpen,
  Calendar1Icon,
  ClockIcon,
  TagsIcon,
} from "lucide-react";
import { getallTraining } from "@/actions/training/training";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { deleteApplication } from "@/actions/session/session";

interface Props {
  session: any;
}

export function SessionCardFormApplications({ session }: Props) {
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
  const handelDeleteApplication = async () => {
    const response = await deleteApplication(session.id);

    window.location.reload();
  };

  return (
    <Card className="w-full max-w-sm cursor-pointer ">
      <CardHeader className="p-0 border-b-2 border-gray-500">
        <div className="relative h-48 w-full">
          <Image
            src={session.training.image || "/placeholder.svg"}
            alt={session.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 h-[300px]">
        <div className="border-b-2 border-gray-300 mb-2">
          <CardTitle className="text-xl mb-2">{session.title}</CardTitle>
          <p className="text-sm mb-2 line-clamp-3">{session.description}</p>
          <div className="flex items-center space-x-2 p-2">
            <Calendar1Icon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              {session?.startDate
                ? format(new Date(session.startDate), "PPP")
                : "Start Date"}{" "}
              -{" "}
              {session?.endDate
                ? format(new Date(session.endDate), "PPP")
                : "End Date"}
            </span>
          </div>
        </div>

        <p className="font-semibold text-sm mb-2">Training Details</p>
        <div className="flex items-center space-x-2 mb-2">
          <Book className="h-4 w-4" />
          <span className="text-sm">Training: {session.training.title}</span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm line-clamp-2">
            Difficulty: {session.training.description}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <div className="flex items-center justify-items-end space-x-2">
          <Link href={`/espace_condidat/training/${session.training.id}`}>
            <Button variant="primary" size={"sm"}>
              View Details
            </Button>
          </Link>
          <Button
            variant="destructive"
            size={"sm"}
            onClick={() => handelDeleteApplication()}
          >
            Cancel Application
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
