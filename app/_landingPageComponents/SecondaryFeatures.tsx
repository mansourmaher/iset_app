"use client";

import Image, { type ImageProps } from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "../_landingPageComponents/Container";

import progress from "../images/easelearnscreen/progress.png";
import cours from "../images/easelearnscreen/cours.png";
import {
  BookOpenIcon,
  ChartBarIcon,
  StarIcon,
} from "@heroicons/react/20/solid";

interface Feature {
  name: React.ReactNode;
  summary: string;
  description: string;
  image: ImageProps["src"];
  icon: React.ComponentType;
}

const features: Array<Feature> = [
  {
    name: "Explore Courses",
    summary: "Discover a wide range of courses tailored to your interests.",
    description:
      "Browse through our extensive library of courses, covering various topics and skill levels. Whether you're a beginner or an advanced learner, you'll find the perfect course to enhance your knowledge.",
    image: cours, // Make sure to define this variable
    icon: function ExploreCoursesIcon() {
      return (
        <>
          <BookOpenIcon className="text-white" />
        </>
      );
    },
  },
  {
    name: "Track Progress",
    summary: "Monitor your learning journey and achievements.",
    description:
      "Keep track of your course progress with our intuitive dashboard. View completed courses, outstanding modules, and certificates earned. Get insights into your learning habits to improve your study routine.",
    image: progress, // Make sure to define this variable
    icon: function TrackProgressIcon() {
      return (
        <>
          <ChartBarIcon className="text-white" />
        </>
      );
    },
  },
  {
    name: "Learn From Experts",
    summary: "Gain knowledge from industry experts and professionals.",
    description:
      "Our courses are designed and taught by industry experts, ensuring you receive the most relevant and up-to-date information. Learn from professionals who have years of experience in their field and are passionate about sharing their knowledge.",
    image: progress, // Make sure to define this variable
    icon: function GetCertifiedIcon() {
      return (
        <>
          <StarIcon className="text-white" />
        </>
      );
    },
  },
];

function Feature({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  feature: Feature;
  isActive: boolean;
}) {
  return (
    <div
      className={clsx(className, !isActive && "opacity-75 hover:opacity-100")}
      {...props}
    >
      <div
        className={clsx(
          "w-9 rounded-lg",
          isActive ? "bg-blue-600" : "bg-slate-500"
        )}
      >
        <svg aria-hidden="true" className="h-9 w-9" fill="none">
          <feature.icon />
        </svg>
      </div>
      <h3
        className={clsx(
          "mt-6 text-sm font-medium",
          isActive ? "text-blue-600" : "text-slate-600"
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-2 font-display text-xl text-slate-900">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-slate-600">{feature.description}</p>
    </div>
  );
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.summary}>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          {/* <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={feature.image}
                alt=""
                sizes="52.75rem"
              />
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
}

function FeaturesDesktop() {
  return (
    <TabGroup className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <TabList className="grid grid-cols-3 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.summary}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="ui-not-focus-visible:outline-none">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </TabList>
          {/* <TabPanels className="relative mt-20 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <TabPanel
                  static
                  key={feature.summary}
                  className={clsx(
                    "px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none",
                    featureIndex !== selectedIndex && "opacity-60"
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <Image
                      className="w-full"
                      src={feature.image}
                      alt=""
                      sizes="52.75rem"
                    />
                  </div>
                </TabPanel>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10" />
          </TabPanels> */}
        </>
      )}
    </TabGroup>
  );
}

export function SecondaryFeatures() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="pb-14 pt-10 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Invest in your career
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            77% of learners report career benefits, like landing a new job,
            earning a promotion, gaining applicable skills, and more
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  );
}
