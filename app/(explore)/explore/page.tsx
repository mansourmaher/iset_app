import CourseListSection from "./_explorecomponents/courseListSection";
import HeroSection from "./_explorecomponents/HeroSection";
import ExploreSection from "./_explorecomponents/exploresection";
import { Search } from "lucide-react";
import { Input } from "@headlessui/react";
import { Card, CardContent } from "@/components/ui/card";
import HeroSectionPromo from "./_explorecomponents/HeroSectionPromo";
import WhyChooseUs from "./_explorecomponents/whychooseus";
import { getCoursesForExplorePage } from "@/actions/course/course";


const categories = [
  { name: "Web Development", icon: "🌐" },
  { name: "Data Science", icon: "📊" },
  { name: "Design", icon: "🎨" },
  { name: "Business", icon: "💼" },
  { name: "Marketing", icon: "📣" },
  { name: "Mobile Development", icon: "📱" },
  { name: "AI & Machine Learning", icon: "🤖" },
  { name: "Cloud Computing", icon: "☁️" },
  { name: "DevOps", icon: "⚙️" },
  { name: "Cybersecurity", icon: "🔒" },
  { name: "Blockchain", icon: "🔗" },
  { name: "Product Management", icon: "📦" },
];

const ExplorePage = async () => {
  const courses = await getCoursesForExplorePage();
  return (
    <div className="mt-14">
      <HeroSectionPromo />

      <section className="container mx-auto py-8 px-2">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Explore Top Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-gary-100 border rounded-lg p-4">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <CourseListSection
        section_id="Most popular"
        courses={courses}
        titleofbanner="Based on your preferences, we recommend tailored courses just for you."
        descriptionofbanner=" Our personalized recommendations are carefully selected to help you grow
        in your areas of interest. We analyze your learning patterns and
        preferences to curate a unique selection of courses that align with your
        goals. Whether you re a beginner looking to explore new topics or an
        experienced learner advancing your expertise, our system ensures you get
        the most relevant and impactful content."
      />
      {/* this section contain top rated course */}
      <CourseListSection
        section_id="Top rated"
        courses={courses}
        titleofbanner="
        Top-rated courses from our expert instructors."
        descriptionofbanner="Our top-rated courses are designed and delivered by industry experts who"
      />
      {/* this section contain newest course */}
      <CourseListSection
        section_id="Newest"
        courses={courses}
        titleofbanner="Explore our newest courses and stay ahead of the curve."
        descriptionofbanner="Stay up-to-date with the latest trends and technologies by enrolling in our
        newest courses. Our expert instructors are constantly updating their
        content to provide you with the most relevant and cutting-edge
        information. Whether you re looking to expand your knowledge or learn
        something new, our newest courses are the perfect place to start."
      />
      <WhyChooseUs />
    </div>
  );
};

export default ExplorePage;
