"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, X, Plus, Loader } from "lucide-react";
import UploadLessonResource from "./AddResources";
import {
  addResourceToLesson,
  updateResourceDeatil,
} from "@/actions/lesson/lesson";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Resource } from "@prisma/client";

interface ChapterResourceProps {
  resourcess:
    | {
        id: string;
        title: string;
        url: string;
        descreption: string | null;
        estimatedTime: number | null;
      }[]
    | undefined;
  lessonId: string;
}

function ChapterResource({ resourcess, lessonId }: ChapterResourceProps) {
  const [tabOfnewResource, setTabOfnewResource] = useState<
    { title: string; url: string; descreption: string; estimatedTime: number }[]
  >([]);
  const [resources, setResources] = useState(resourcess || []);
  const [isloading, setIsLoading] = useState(false);

  const onFileChange = (
    list: {
      title: string;
      url: string;
      descreption: string;
      estimatedTime: number;
    }[]
  ) => {
    setTabOfnewResource((prevTabOfNewResource) => [
      ...prevTabOfNewResource,
      ...list,
    ]);
  };

  const onSubmit = async () => {
    await addResourceToLesson(lessonId, tabOfnewResource);
    setTabOfnewResource([]);
    window.location.reload();
  };

  const updateResource = (resId: string, e: any) => {
    setResources(
      resources.map((res) =>
        res.id === resId ? { ...res, [e.target.name]: e.target.value } : res
      )
    );
    console.log(resources);
  };
  const updateResourceDetail = async () => {
    setIsLoading(true);
    await updateResourceDeatil(resources);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="resources">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="descreption">
              Resources descreptions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-4">
            <ScrollArea className="h-[200px] rounded-lg border p-4">
              {/* Display initial resources */}
              {resources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{resource.title}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              {/* Display new resources (not yet uploaded) */}
            </ScrollArea>
            <UploadLessonResource onFileChange={onFileChange} />
            {tabOfnewResource.length > 0 && (
              <div className="flex items-center justify-center flex-col">
                <span>
                  <p className="text-sm text-muted-foreground">
                    {tabOfnewResource.length} ready to be saved
                  </p>
                </span>

                <Button
                  variant="primary"
                  onClick={onSubmit}
                  className=" mt-2"
                  size={"sm"}
                >
                  Save New Resources
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="descreption" className="space-y-4">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4 border ">
              {resources.map((res, index) => (
                <div key={index} className="col-span-1">
                  <div className="space-y-1">
                    <p className="font-semibold">{res.title}</p>
                    <Label htmlFor={`description-${res.id}`}>Description</Label>
                    <Textarea
                      id={`description-${res.id}`}
                      placeholder="Enter resource description..."
                      value={res.descreption!}
                      name="descreption"
                      className="min-h-[100px]"
                      onChange={(e) => updateResource(res.id, e)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="estimated time">
                      Estimated Time (in minutes)
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter estimated time..."
                      name="estimatedTime"
                      value={res.estimatedTime!}
                      onChange={(e) => updateResource(res.id, e)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end ">
              <Button
                onClick={() => updateResourceDetail()}
                variant={"primary"}
                disabled={isloading}
                size={"sm"}
              >
                {isloading ? (
                  <Loader className="animate-spin"></Loader>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default ChapterResource;
