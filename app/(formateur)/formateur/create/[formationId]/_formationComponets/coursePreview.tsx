import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, MailPlusIcon, Users } from "lucide-react";

function CoursePreview() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Users className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold">Invite formateurs</h3>
            <p className="text-sm text-muted-foreground">
              Invite formateurs to help you create this course
            </p>
          </div>
        </div>
        <div className="">
          <Input placeholder={"Enter formateur's email"} className="mt-4" />
          <Button className="w-full " variant="outline">
            Invite
          </Button>
        </div>
      </CardContent>
      
    </Card>
  );
}

export default CoursePreview;
