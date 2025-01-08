import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

import screenshotContacts from "../images/screenshots/contacts.png";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 mt-24   lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 ">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-4xl">
              <div className="max-w-2xl">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Grow up your skills by online courses with Fourmini
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Fourmini is a modern and responsive online learning platform
                  that provides a complete learning experience for users.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4 bg-gray-200 p-2 rounded">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      className="pl-8 bg-white dark:bg-gray-950"
                      placeholder="Search for courses..."
                      type="search"
                    />
                  </div>
                  <Button className="gap-2">
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-800/10 ring-1 ring-indigo-300 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}
export default Hero;
