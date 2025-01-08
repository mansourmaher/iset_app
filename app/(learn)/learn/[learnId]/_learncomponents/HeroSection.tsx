import Image from "next/image";

import backgroundFaqs from "@/app/images/background-faqs.jpg";
import AvatarGroup from "@/app/ui-components/avatarsgroup";
import Button from "@/app/ui-components/button";
import { BookOpenIcon } from "@heroicons/react/20/solid";
import { FaLevelDownAlt } from "react-icons/fa";
import { ChartArea, Users } from "lucide-react";
import { existpurchase } from "@/actions/courseuser/courseuser";

const staticDtatoDisplay = {
  title: "Learning how to youth in the community",
  avatars: [
    {
      name: "John Doe",
      src: "https://randomuser.me/api/portraits",
    },
    {
      name: "Jane Doe",
      src: "https://randomuser.me/api/portraits",
    },
    {
      name: "John Doe",
      src: "https://randomuser.me/api/portraits",
    },
    {
      name: "Jane Doe",
      src: "https://randomuser.me/api/portraits",
    },
  ],
  enrolled: "80,000",
  modules: "3",
  reviews: "2859",
  average: "4.8",
  level: "Beginner level",
  leveldesc: "No prior expert needed",
  likes: "98%",
};

interface HeroSectionProps {
  title: string | undefined;
  chaptersLength: number | undefined;
  courseId: string;
}

const HeroSection = async ({
  title,
  chaptersLength,
  courseId,
}: HeroSectionProps) => {
  const existingpurchase = await existpurchase(courseId);
  console.log(existingpurchase);

  return (
    <>
      <div className="relative">
        <Image
          src={backgroundFaqs}
          alt="Learn Hero"
          loading="lazy"
          className="object-cover h-[70vh] w-screen"
        />
        <div className="absolute inset-0 flex flex-col items-center text-center container mx-auto place-content-center space-y-4 md:items-center lg:items-start md:text-left">
          <h1 className="text-4xl font-extrabold">{title}</h1>

          <div className="flex gap-x-2 items-center">
            <AvatarGroup />
            <p>Instructor: {staticDtatoDisplay.avatars[0].name}</p>
          </div>

          <div className="flex gap-x-4 items-center">
            {!existingpurchase ? (
              <Button courseId={courseId} />
            ) : (
              <>already enrolled</>
            )}

            <p>
              <span className="font-bold">{staticDtatoDisplay.enrolled}</span>{" "}
              students enrolled
            </p>
          </div>

          {/* New section for Enroll Options */}
          <div className="mt-4 flex flex-col space-y-3">
            <div className="p-4 border rounded-md bg-gray-100">
              <p className="text-sm font-semibold">Promotion:</p>
              <p className="text-sm text-gray-700">
                Enroll in this course and share your referral link to get 15%
                off the price. If your friend enrolls using your link, you ll
                also receive 15% off!
              </p>
              <div className="mt-2">
                <button className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-md hover:bg-green-600">
                  Copy Referral Link
                </button>
              </div>
            </div>
          </div>

          {/* Option for using a referral link */}
          <div className="mt-4 p-4 border rounded-md bg-gray-100">
            <p className="text-sm font-semibold">Invited by a Friend?</p>
            <p className="text-sm text-gray-700">
              Use your friend s referral link to get 15% off your enrollment!
            </p>
          </div>
        </div>
      </div>

      {/* Card component */}
      <div className="relative w-11/12 lg:-translate-y-24 bg-white rounded-lg shadow-lg lg:p-10 mx-auto -mt-[90px] p-10">
        <div className="grid grid-cols-2 place-content-center sm:grid-cols-2  lg:grid-cols-4 gap-6">
          <div className="space-y-2 border-r border-gray-300 pr-4">
            <div className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-indigo-500 mr-2" />
              <p className="text-xl font-bold">{chaptersLength} modules</p>
            </div>
            <p className="text-sm text-slate-500">
              Gain insight into a topic and learn the fundamentals.
            </p>
          </div>{" "}
          <div className="space-y-2 border-r border-gray-300 pr-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-indigo-500 mr-2" />
              <p className="text-xl font-bold">
                {" "}
                {staticDtatoDisplay.enrolled} enrolled
              </p>
            </div>
            <p className="text-sm text-slate-500">
              {staticDtatoDisplay.enrolled} students enrolled in this course
            </p>
          </div>{" "}
          <div className="space-y-2 border-r border-gray-300 pr-4">
            <div className="flex items-center">
              <ChartArea className="h-8 w-8 text-indigo-500 mr-2" />
              <p className="text-xl font-bold">Advanced level</p>
            </div>
            <p className="text-sm text-slate-500">
              Gain insight into a topic and learn the fundamentals.
            </p>
          </div>{" "}
          <div className="space-y-2 border-r border-gray-300 pr-4">
            <div className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-indigo-500 mr-2" />
              <p className="text-xl font-bold">3 modules</p>
            </div>
            <p className="text-sm text-slate-500">
              Gain insight into a topic and learn the fundamentals.
            </p>
          </div>
          {/* Repeat similar sections for other columns */}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
