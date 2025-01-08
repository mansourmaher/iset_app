import { EyeDropperIcon } from "@heroicons/react/20/solid";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ReviewProgress from "./Review";
import { Badge } from "@/components/ui/badge";
import { BookOpen, DollarSign, Eye, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoursesForExplorePage } from "@/actions/course/course";

interface Course {
  course:Awaited<ReturnType<typeof getCoursesForExplorePage>>[0];
}

type CourseCardProps = {
  course: Course["course"];
};

function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="flex flex-col gap-2 p-2 border bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full aspect-video rounded-xl mb-4">
        <Image
          className="w-full object-cover rounded-xl"
          src={course.image}
          alt="Course Image"
          fill
          sizes="100vw"
          priority
        />
      </div>
      <hr className="border-t border-muted-foreground mb-2" />

      <h3 className="font-bold truncate">{course.title}</h3>
      <p className="text-sm text-muted-foreground mt-1.5 line-clamp-3 h-14 ">
        {course.description}
      </p>
      <div className="px-2">
        <ReviewProgress
          courseId={course.id}
          avg={4.5}
          totalReviews={24}
          isForCard={true}
        />
      </div>
      {/* <div className="flex flex-row justify-between items-center md:flex-col sm:flex-col mt-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="yellow" className="max-w-[100px] truncate">
            {course.category}
          </Badge>
          <Badge
            variant="outline"
            className="max-w-[100px] truncate flex items-center"
          >
            <BookOpen size={14} className="mr-2" />
            {course.chapterLenght} chapters
          </Badge>
          <Badge
            variant="primary"
            className="max-w-[100px] truncate flex items-center"
          >
            <DollarSign size={14} className="mr-2" />
            {course.price} D
          </Badge>
        </div>
      </div> */}

      {/* <div className="flex justify-between items-center mt-4">
        <div></div>
        <div className="mt-2">
          <Button variant={"primary"}>
            <Link
              href={`/learn/${course.id}`}
              className="flex items-center gap-x-3"
            >
              <Eye size={18} /> View Course
            </Link>
          </Button>
        </div>
      </div> */}
      <Button variant={"primary"}>
        <Link
          href={`/learn/${course.id}`}
          className="flex items-center gap-x-3"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Learning
        </Link>
      </Button>
    </div>
  );
}

export default CourseCard;
