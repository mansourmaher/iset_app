"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { set } from "zod";
import { init } from "next/dist/compiled/webpack/webpack";

interface Props {
  onImageChange(url: string): void;
  initialImage?: string | null;
}

function UploadImageForRegistartion({ onImageChange, initialImage }: Props) {
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const { startUpload } = useUploadThing("photoProfile", {
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
      <Label>Profile Photo</Label>
      <span className="text-slate-500 text-sm "> {" "}(optional)</span>

      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
        <Dropzone
          accept={{ "image/*": [".jpg", ".png", ".jpeg"] }}
          onDrop={async (acceptedFiles) => {
            setLoading(true);
            setError(null);
            const res = await startUpload(acceptedFiles);
            setLoading(false);

            if (res) {
              setImage(res[0].url);
              onImageChange(res[0].url);
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="flex flex-col items-center">
              <input {...getInputProps()} />
              {image ? (
                <div className="relative w-full h-full flex justify-center">
                  <Image
                    src={image}
                    alt="Course Thumbnail"
                    className="rounded-lg"
                    width={480}
                    height={500}
                  />
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
                      <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div className="mt-4">
                        <Button variant="secondary" type="button">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Recommended size: 1280x720px
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

export default UploadImageForRegistartion;
