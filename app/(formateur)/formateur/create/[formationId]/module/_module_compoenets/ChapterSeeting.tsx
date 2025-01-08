"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Lock, Users, Pencil } from "lucide-react";
import { changeLessonVisibility } from "@/actions/lesson/lesson";
import { useRouter } from "next/navigation";

interface ChapterSeetingsProps {
  lessonId: string;
  visibility: boolean | undefined;
  prerequisites: string;
}

function ChapterSeeting({
  visibility,
  prerequisites,
  lessonId,
}: ChapterSeetingsProps) {
  const router = useRouter();
  const handelVisibility = async (value: boolean) => {
    if (visibility === value) return;
    await changeLessonVisibility(lessonId, value);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Access Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Control who can access this chapter
              </p>
            </div>
            <Select defaultValue={visibility ? "private" : "public"}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="public"
                  onClick={() => handelVisibility(false)}
                >
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Public
                  </div>
                </SelectItem>
                <SelectItem
                  value="private"
                  onClick={() => handelVisibility(true)}
                >
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Private
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Prerequisites</Label>
              <p className="text-sm text-muted-foreground">
                Chapters students must complete first
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              Delete Chapter
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                chapter and remove all of its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

export default ChapterSeeting;
