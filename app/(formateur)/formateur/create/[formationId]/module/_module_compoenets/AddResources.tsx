"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { Video as VideoIcon, Upload, Plus, File } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadLessonResourceProps {
  onFileChange(list: { title: string; url: string }[]): void;
}

function UploadLessonResource({ onFileChange }: UploadLessonResourceProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const { startUpload } = useUploadThing("lessonFile", {
    onUploadError: (error) => {
      setError(error.message);
      setLoading(false);
    },
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });

  return (
    <div className="space-y-2">
      <div className="">
        <Dropzone
          onDrop={async (acceptedFiles) => {
            setLoading(true);
            setError(null);
            const res = await startUpload(acceptedFiles);
            setLoading(false);

            if (res) {
              console.log(res);
              onFileChange(
                res.map((file) => ({ title: file.name, url: file.url }))
              );
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="flex flex-col items-center">
              <input {...getInputProps()} type="file" accept=".pdf" />

              {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
              {loading && (
                <>
                  <p className="text-xs text-muted-foreground mb-4">
                    Uploading...
                  </p>
                  <Progress
                    value={progress}
                    className={cn(
                      "h-1",
                      progress === 100 ? "bg-primary" : "bg-gray-300"
                    )}
                  />
                </>
              )}
              {!loading && (
                <>
                  <>
                    <div className="mt-4">
                      <Button variant="secondary">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Resource
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      The file should be in PDF format
                    </p>
                  </>
                </>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}

export default UploadLessonResource;
