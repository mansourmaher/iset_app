import { GhostIcon } from "lucide-react";

export function UnothorizeState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <GhostIcon className="h-16 w-16 text-muted-foreground" />
      <div className="text-2xl font-semibold text-muted-foreground">
        You are not authorized to view the content of the course
      </div>
      <div className="text-sm text-muted-foreground">
        Please purchase the course to view his content
      </div>
    </div>
  );
}
