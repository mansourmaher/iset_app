import Image from "next/image";
import React from "react";
import backgroundFaqs from "@/app/images/background-faqs.jpg";

function HeroSection() {
  return (
    <div className="relative flex flex-col items-center text-center  space-y-6 py-12 bg-gradient-to-b from-blue-500 to-blue-300 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-white">
        Unlock Your Potential: Explore Our Courses
      </h1>

      <p className="text-lg text-white opacity-90">
        Learn from industry experts and enhance your skills in various fields.
      </p>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-3xl font-bold text-blue-500">28,000+</p>
          <p className="text-sm text-gray-600">Students Enrolled</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-3xl font-bold text-blue-500">100+</p>
          <p className="text-sm text-gray-600">Courses Available</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-3xl font-bold text-blue-500">50+</p>
          <p className="text-sm text-gray-600">Expert Instructors</p>
        </div>
      </div>

      <div className="mt-6">
        <button className="px-6 py-3 bg-green-500 text-white text-lg rounded-md hover:bg-green-600 transition duration-200">
          Start Learning Now
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
