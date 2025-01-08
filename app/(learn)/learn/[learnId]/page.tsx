import LearnSectionheaders from "../../_learn_compoenets/learnsections";
import WahtLearn from "../../_learn_compoenets/whatlearn";
import CourseModule from "../../_learn_compoenets/courseModule";
import RecemondedBlock from "../../_learn_compoenets/recomendedBlock";
import CategoryCompoent from "../../_learn_compoenets/ReveiwsCompoent";
import HeroSection from "./_learncomponents/HeroSection";
import { getCourseByIdForLearnPage } from "@/actions/course/course";

const LearnPage = async ({ params }: { params: { learnId: string } }) => {
  const course = await getCourseByIdForLearnPage(params.learnId);
  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <div className="space-y-8">
      <HeroSection
        title={course?.title}
        chaptersLength={course?.chapters.length}
        courseId={course.id}
      />
      <div className="transform lg:-translate-y-24 ">
        <div className="mt-10  container mx-auto">
          <LearnSectionheaders />
        </div>
        <div className="mt-10 container mx-auto">
          <WahtLearn Skills={course?.skills} />
        </div>
        <section id="course-module" className="mt-10 container mx-auto">
          <CourseModule
            courseTitle={course?.title}
            courseDescrpeiton={course?.description}
            // @ts-ignore
            chapterss={course?.chapters!}
            image={course?.image}
            courseId={course.id}
          />
        </section>
        <div className="mt-10 container mx-auto">
          <RecemondedBlock />
        </div>
        <div className="mt-10 container mx-auto">
          <CategoryCompoent />
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
