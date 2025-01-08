import Video from "next-video";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  Code,
  Laptop,
  List,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import Resources from "./resources";

interface VideoLessonProps {
  video: string | undefined;
  descreption: string | undefined;
  title: string | undefined;
  lessonId: string;
}

const VideoLesson = async ({
  video,
  descreption,
  title,
  lessonId,
}: VideoLessonProps) => {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <Video
                className="w-full"
                controls
                preload="none"
                accentColor="#A9F3F8"
              >
                <source src={video} type="video/mp4" />
                <track
                  src="/path/to/captions.vtt"
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
                Your browser does not support the video tag.
              </Video>
            </div>

            <Tabs defaultValue="overview" className="w-full p-4">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 p-4">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h1 className="text-2xl font-bold">
                    Getting Started with HTML and CSS
                  </h1>
                  <p>
                    Learn the basics of creating structured web pages with HTML
                    and how to style them with CSS.
                  </p>

                  <h2 className="text-xl font-semibold mt-6">Skills Gained</h2>
                  <div className="flex flex-wrap gap-2 my-4">
                    {[
                      "HTML fundamentals",
                      "CSS styling",
                      "Web page structure",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-semibold mt-6">
                    Learning Objectives
                  </h2>
                  <ul className="space-y-2 list-none pl-0">
                    {[
                      {
                        icon: FileText,
                        text: "Understand the basic structure of an HTML document",
                      },
                      {
                        icon: Code,
                        text: "Learn common HTML tags and their purposes",
                      },
                      {
                        icon: Laptop,
                        text: "Introduce CSS and its role in web design",
                      },
                      {
                        icon: List,
                        text: "Create simple styles using CSS selectors and properties",
                      },
                    ].map(({ icon: Icon, text }, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="transcript" className="space-y-4 p-4">
                <Card>
                  <CardContent className="p-4 prose prose-gray dark:prose-invert">
                    <p>Transcript content would go here...</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notes" className="space-y-4 p-4">
                <Card>
                  <CardContent className="space-y- p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">My Notes</h3>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      No notes yet. Start taking notes!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources" className="space-y-4 p-4">
                <Resources lessonId={lessonId} />
              </TabsContent>
            </Tabs>

            <div className="flex items-center space-x-2">
              4
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mark as completed
              </label>
            </div>

            <div className="flex justify-between">
              <Button variant="outline">Previous Lesson</Button>
              <Button>Next Lesson</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoLesson;
