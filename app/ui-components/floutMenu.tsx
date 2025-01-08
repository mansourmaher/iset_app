import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ChevronDownIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/20/solid";
import { BookOpenIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { BiDownArrow } from "react-icons/bi";

interface FlayoutMenuProps {
  title: string;
}

export default function FlayoutMenu({ title }: FlayoutMenuProps) {
  return (
    <Popover className="relative isolate z-50 shadow bg-white">
      <div className="bg-white py-5">
        <div className="mx-auto max-w-7xl">
          <PopoverButton className="flex justify-between items-center px-6 w-full cursor-pointer hover:bg-blue-200">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">{title}</p>
            </div>
            <div className="flex gap-x-1 items-center font-semibold text-blue-500">
              <p>View Details</p>
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </PopoverButton>
        </div>
      </div>

      <PopoverPanel className="bg-white p-8 mt-2  ring-1 ring-gray-900/5">
        <p className="text-sm text-slate-500">
          This module dives deeper into advanced design concepts, ensuring a
          comprehensive understanding of practical techniques. Topics include
          color theory, typography, responsive design, and interactive elements
          for web and mobile applications.
        </p>
        <div className="mt-4">
          <p className="flex items-center space-x-2 font-bold  ">
            <span className=" ">
              <VideoCameraSlashIcon className="h-6 w-6 " />
            </span>{" "}
            <p className="">6 Video lessons</p>
          </p>
          <div className="flex flex-col gap-2 my-2 ">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-slate-500">
                Introcution .
                <span className="text-sm text-slate-500"> (20 minutes) . </span>
                <span>
                  <span className="text-blue-500 font-semibold cursor-pointer">
                    Preview Model
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 my-2 ">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-slate-500">
                Introduction to design fundamentals .
                <span className="text-sm text-slate-500"> (20 minutes) . </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 my-2 ">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-slate-500">
                Starting the creative process .
                <span className="text-sm text-slate-500"> (20 minutes) . </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 my-2 ">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-slate-500">
                Composition principles and layout techniques .
                <span className="text-sm text-slate-500"> (20 minutes) . </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="flex items-center space-x-2 font-bold  ">
            <span className=" ">
              <BookOpenIcon className="h-6 w-6 " />
            </span>{" "}
            <p className="">15 Course readings</p>
          </p>

          <div className="flex items-center space-x-4">
            <p className="text-sm text-slate-500">
              Introcution .
              <span className="text-sm text-slate-500"> (20 minutes) . </span>
              <span>
                <span className="text-blue-500 font-semibold cursor-pointer">
                  Preview Model
                </span>
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-sm text-slate-500">
              Introduction to design fundamentals .
              <span className="text-sm text-slate-500"> (20 minutes) . </span>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-sm text-slate-500">
              Starting the creative process .
              <span className="text-sm text-slate-500"> (20 minutes) . </span>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-sm text-slate-500">
              Composition principles and layout techniques .
              <span className="text-sm text-slate-500"> (20 minutes) . </span>
            </p>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
