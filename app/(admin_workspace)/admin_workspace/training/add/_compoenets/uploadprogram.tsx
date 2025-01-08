"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { Cloud, File, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Props {
  onPrgChange(url: string): void;
  initialPrg?: string;
}

function UplaodProgram({ onPrgChange, initialPrg }: Props) {
  const [prg, setPrg] = useState<string | undefined>(initialPrg);
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
      <div className="border-2 border-dashed rounded-lg p-2 text-center hover:bg-muted/50 transition-colors">
        <Dropzone
          accept={{ "application/pdf": [".pdf"] }}
          onDrop={async (acceptedFiles) => {
            setLoading(true);
            setError(null);
            const res = await startUpload(acceptedFiles);
            setLoading(false);

            if (res) {
              setPrg(res[0].url);
              onPrgChange(res[0].url);
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="flex flex-col items-center">
              <input {...getInputProps()} />
              {prg && !loading ? (
                <div className="relative w-full h-full flex justify-center">
                  <File className="h-6 w-6 text-blue-400" />
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
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Cloud className="h-6 w-6 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        Drag and drop your file here or{" "}
                        <span className="text-primary">browse</span>
                        <p className="text-primary">
                          Only .pdf files are allowed
                        </p>
                      </p>
                    </div>
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

export default UplaodProgram;
