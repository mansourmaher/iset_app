"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { File, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Props {
  onCvChange(url: string): void;
  initialCv: string | undefined;
}

function UploadCvForRegistartion({ onCvChange, initialCv }: Props) {
  const [cv, setCv] = useState(initialCv);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const { startUpload } = useUploadThing("cv", {
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
      <Label>Upload  cv</Label>
      <span className="text-slate-500 text-sm "> (optional)</span>

      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
        <Dropzone
          accept={{ "application/pdf": [".pdf"] }}
          onDrop={async (acceptedFiles) => {
            setLoading(true);
            setError(null);
            const res = await startUpload(acceptedFiles);
            setLoading(false);

            if (res) {
              setCv(res[0].url);
              onCvChange(res[0].url);
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="flex flex-col items-center">
              <input {...getInputProps()} />
              {cv ? (
                <div className="relative w-full h-full flex justify-center">
                  <p className="text-sm text-primary">Cv uploaded</p>
                </div>
              ) : (
                <>
                  {error && (
                    <p className="text-xs text-red-500 mt-2">{error}</p>
                  )}
                  {loading && (
                    <>
                      <span>
                        <p className="text-xs text-muted-foreground mt-2">
                          Uploading...
                        </p>
                      </span>
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
                      <File className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div className="mt-4">
                        <Button variant="secondary" type="button">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Cv
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Recommended size: 1GB
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}

export default UploadCvForRegistartion;
