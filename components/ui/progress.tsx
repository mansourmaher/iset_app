"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <div className="w-full flex items-center ">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted dark:bg-slate-800",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          value === 100 ? "bg-blue-400" : "bg-blue-400",
          "h-full rounded-full "
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  </div>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
