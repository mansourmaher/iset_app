import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { Check } from "lucide-react";
import React from "react";

interface WahtLearnProps {
  Skills: string[] | undefined;
}

function WahtLearn({ Skills }: WahtLearnProps) {
  return (
    <section
      id="Skills"
      className="space-y-4 bg-white border-b-2 p-4 container mx-auto"
    >
      <div>
        <h1 className="text-2xl font-extrabold">What you will learn</h1>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 text-sm text-slate-500 ">
        {Skills?.map((skill, index) => (
          <div key={index} className="relative">
            <div className="flex items-center gap-4">
              <div className="mt-1 bg-primary/10 rounded-full p-1">
                <Check className="w-4 h-4 text-blue-500" />
              </div>
              <div className="">
                <h3 className="font-medium leading-none">{skill}</h3>
                <div className="pt-2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-extrabold">Skill You will gain</h1>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Test Preparation
          </span>
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Learning To Learn
          </span>
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Pomodoro Technique
          </span>
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Time Management
          </span>
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Note Taking
          </span>
        </div>
      </div>
    </section>
  );
}
export default WahtLearn;
