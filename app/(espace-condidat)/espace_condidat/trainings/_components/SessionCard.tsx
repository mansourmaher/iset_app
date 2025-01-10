import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ClockIcon, TagsIcon } from "lucide-react";
import { getallTraining } from "@/actions/training/training";
import Link from "next/link";

interface Props {
  session: Awaited<ReturnType<typeof getallTraining>>[0];
}

export function SessionCard({ session }: Props) {
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

  return (
    <Link href={`/espace_condidat/training/${session.id}`}>
      <Card className="w-full max-w-sm cursor-pointer">
        <CardHeader className="p-0 border-b-2 border-gray-500">
          <div className="relative h-48 w-full">
            <Image
              src={session.image || "/placeholder.svg"}
              alt={session.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <CardTitle className="text-xl mb-2">{session.title}</CardTitle>

          <p className="text-sm mb-2 line-clamp-3">{session.description}</p>
          <div className="flex items-center space-x-2 mb-2">
            <ClockIcon className="h-4 w-4" />
            <span className="text-sm">Duration: {session.duration} Hours</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm">Difficulty: {session.difficulty}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t-2 border-gray-200">
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TagsIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {session.tags.map((tag, index) => (
                  <Badge
                    key={`tag-${index}`}
                    variant="secondary"
                    className="px-2 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TagsIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  Categories
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {session.category.map((category, index) => (
                  <Badge
                    key={`category-${index}`}
                    variant="outline"
                    className="px-2 py-1 text-gray-700 border-gray-400"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
{
  /* <div className="flex flex-col space-y-2">
            {" "}
            <div className="flex items-center space-x-1">
              <Badge className="flex items-center space-x-1">
                <TagsIcon className="h-4 w-4" />
                Tags
              </Badge>
              {session.tags.map((tag, index) => (
                <Badge key={`tag-${index}`} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center space-x-1">
             
              <div className="flex flex-wrap gap-1">
                {session.category.map((category, index) => (
                  <Badge key={`category-${index}`} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div> */
}
