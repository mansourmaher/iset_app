import Image from "next/image";
import { Header } from "./_landingPageComponents/Header";
import { Faqs } from "./_landingPageComponents/Faqs";
import Hero from "./_landingPageComponents/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Video,
  ArrowRight,
  Headphones,
  MonitorSmartphone,
} from "lucide-react";
import { auth } from "@/auth";
import Navbar from "./_newCompoents/Navbar";
const categories = [
  {
    title: "Standard One",
    description:
      "Standard 1 is a foundation year that helps students to settle into school life.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Standard Two",
    description:
      "Students learn more complex concepts and develop critical thinking skills.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Standard Three",
    description:
      "Building on previous knowledge with more advanced topics and projects.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Standard Four",
    description:
      "Focused on preparing students for intermediate education levels.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Standard Five",
    description: "Advanced concepts and specialized subjects are introduced.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-pink-100 text-pink-700",
  },
  {
    title: "Standard Six",
    description:
      "Preparation for secondary education with comprehensive coursework.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Standard Seven",
    description:
      "Final year focusing on exam preparation and future readiness.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-red-100 text-red-700",
  },
  {
    title: "Standard Eight",
    description: "Advanced placement courses and career guidance programs.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-indigo-100 text-indigo-700",
  },
];

const Home = async () => {
  const user = await auth();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="bg-gray-50">
          <section className="container mx-auto p-8">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  High quality video, audio & live classes
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides high-definition video lessons,
                  crystal-clear audio content, and interactive live classes to
                  ensure the best learning experience.
                </p>
                <Button size="lg" variant={"primary"}>
                  Explore Classes
                </Button>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="relative">
                  <Image
                    src="/Hero.jpg"
                    alt="Instructor teaching"
                    width={600}
                    height={400}
                    className="rounded-lg"
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-lg" />
                </div>
                <div className="grid gap-4 md:gap-8">
                  <div className="flex items-center gap-4 bg-white p-4">
                    <Video className="w-8 h-8 text-blue-600" />
                    <div className="space-y-1">
                      <h3 className="font-bold">Video Classes</h3>
                      <p className="text-gray-500">
                        High-quality recorded lessons available anytime
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-4">
                    <Headphones className="w-8 h-8 text-blue-600" />
                    <div className="space-y-1">
                      <h3 className="font-bold">Audio Classes</h3>
                      <p className="text-gray-500">
                        Learn on the go with audio lessons
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-4">
                    <MonitorSmartphone className="w-8 h-8 text-blue-600" />
                    <div className="space-y-1">
                      <h3 className="font-bold">Live Classes</h3>
                      <p className="text-gray-500">
                        Interactive sessions with expert instructors
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="w-full py-12 md:py-24 lg:py-32  bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Qualified lessons for students
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose from our comprehensive range of courses designed for
                different educational levels
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
              {categories.map((category, index) => (
                <Card key={index} className="relative group overflow-hidden">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-bold mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {category.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-4 w-full group-hover:bg-blue-600 group-hover:text-white"
                    >
                      View Course
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <Faqs />
      </main>
    </>
  );
};

export default Home;
