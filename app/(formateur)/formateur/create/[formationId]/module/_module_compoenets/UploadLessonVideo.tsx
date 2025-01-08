"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { Video as VideoIcon, Upload } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadLessonVideoProps {
  initialVideoUrl: string | null | undefined;
  onVideoChange(url: string): void;
}

function UploadLessonVideo({
  initialVideoUrl,
  onVideoChange,
}: UploadLessonVideoProps) {
  const [video, setVideo] = useState(initialVideoUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const { startUpload } = useUploadThing("lessonVideo", {
    onUploadError: (error) => {
      setError(error.message);
      setLoading(false);
    },
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });

  const handleVideoUpload = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    // Create a temporary video element to load the file and get duration
    const tempVideo = document.createElement("video");
    tempVideo.src = URL.createObjectURL(file);
    tempVideo.onloadedmetadata = () => {
      setVideoDuration(tempVideo.duration); // Get video duration
      URL.revokeObjectURL(tempVideo.src); // Clean up the object URL
    };

    setLoading(true);
    setError(null);

    const res = await startUpload([file]);
    setLoading(false);

    if (res) {
      setVideo(res[0].url);
      onVideoChange(res[0].url);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Video Content</Label>
      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors max-h-[480px]">
        <Dropzone accept={{ "video/*": [] }} onDrop={handleVideoUpload}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="flex flex-col items-center">
              <input {...getInputProps()} />
              {video ? (
                <video
                  src={video}
                  controls
                  className="w-full max-h-[380px] rounded-lg"
                />
              ) : (
                <>
                  {error && (
                    <p className="text-xs text-red-500 mt-2">{error}</p>
                  )}
                  {loading && (
                    <>
                      <p className="text-xs text-muted-foreground mt-2">
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
                      <VideoIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div className="mt-4">
                        <Button variant="secondary">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Video
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Drag and drop your video file here or click to upload
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </Dropzone>
      </div>
      {videoDuration && (
        <p className="text-sm text-muted-foreground mt-2">
          Duration: {Math.floor(videoDuration / 60)}:
          {Math.floor(videoDuration % 60)
            .toString()
            .padStart(2, "0")}{" "}
          minutes
        </p>
      )}
    </div>
  );
}

export default UploadLessonVideo;
