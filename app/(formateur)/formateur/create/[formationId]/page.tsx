import CourseDetails from "./_formationComponets/courseDetails";
import CourseContent from "./_formationComponets/courseContent";
import CourseSetings from "./_formationComponets/courseSetings";
import CoursePreview from "./_formationComponets/coursePreview";
import CourseHelpAndPublish from "./_formationComponets/courseNeedHelpAndPublis";
import { getAllchaptersPerCourse } from "@/actions/chapter/chapter";
import { getCourseById } from "@/actions/course/course";
import CourseSkills from "./_formationComponets/courseSkills";

const createPage = async ({ params }: { params: { formationId: string } }) => {
  const chapters = await getAllchaptersPerCourse(params.formationId);
  const course = await getCourseById(params.formationId);

  return (
    <div className="container mx-auto py-6 space-y-8 mt-16 ">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CourseDetails courseDetail={course} />
          <CourseContent chaptersData={chapters} courseId={course?.id!} />
        </div>
        <div className="space-y-6">
          <CourseSetings courseDetail={course} />
          <CourseSkills courseId={course?.id!} skillse={course?.skills} />
          <CoursePreview />
          <CourseHelpAndPublish />
        </div>
      </div>
    </div>
  );
};
export default createPage;
