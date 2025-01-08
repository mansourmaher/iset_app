"use client";
import { getCoursesForExplorePage } from "@/actions/course/course";
import CourseCard from "@/app/(explore)/explore/_explorecomponents/CourseCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface CourseCardProps {
  courses: Awaited<ReturnType<typeof getCoursesForExplorePage>>;
  titleofbanner: string;
  descriptionofbanner: string;
  section_id: string;
}

function CourseListSection({
  courses,
  titleofbanner,
  descriptionofbanner,
  section_id,
}: CourseCardProps) {
  const [i, setI] = React.useState(4);

  return (
    <section id={section_id} className="py-4 ">
      <div className="container mx-auto   ">
        <div className="flex space-x-2">
          {" "}
          <p className="text-2xl font-semibold flex  ">{titleofbanner}</p>
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {section_id}
          </span>
        </div>
        <p className="text-sm text-gray-700 my-4">{descriptionofbanner}</p>
      </div>

      <div className="w-full">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4  gap-6  border p-8 rounded-lg bg-gray-100 ">
          {courses.slice(0, i).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
          {courses.slice(0, i).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}{" "}
          {courses.slice(0, i).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}{" "}
          {courses.slice(0, i).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}{" "}
          {courses.slice(0, i).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}{" "}
          {courses.slice(0, i).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}{" "}
          {courses.slice(0, i).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      <div className="flex justify-center my-8">
        <Button
          variant="default"
          className="mt-6 border border-blue-400 text-blue-400 bg-white  text-sm"
          onClick={() => setI((prev) => (prev === 4 ? courses.length : 4))}
        >
          {i < courses.length ? "Load More" : "Load Less"}
        </Button>
      </div>
    </section>
  );
}

export default CourseListSection;
