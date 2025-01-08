import { getAllresourcesByLesson } from "@/actions/lesson/lesson";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import React from "react";

interface Props {
  lessonId: string;
}

const Resources = async ({ lessonId }: Props) => {
  const resources = await getAllresourcesByLesson(lessonId);
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Additional Resources</h3>
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
        <ul className="space-y-2">
          {resources?.map((res, index) => (
            <li
              className="flex items-center justify-between p-2 hover:bg-muted rounded-lg"
              key={index}
            >
              <span className="text-sm">{res.title}</span>
              <Button variant="ghost" size="sm">
                Download
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Resources;
