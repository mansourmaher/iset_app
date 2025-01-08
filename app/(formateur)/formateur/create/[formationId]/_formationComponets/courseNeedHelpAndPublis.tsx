import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

function CourseHelpAndPublish() {
  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold">Need Help?</h3>
            </div>
            <Button variant="link" className="text-primary">
              Contact Support
            </Button>
          </div>
        </CardContent>
       
       
      </Card>
      {/* <div className="mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="bg-blue-500 rounded-full w-full text-white">
                Publish Course
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Make your course live for students</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div> */}
    </div>
  );
}

export default CourseHelpAndPublish;
