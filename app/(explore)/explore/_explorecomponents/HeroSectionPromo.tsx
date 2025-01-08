import Image from "next/image";

import backgroundFaqs from "@/app/images/background-faqs.jpg";

function HeroSectionPromo() {
  return (
    <div className="relative ">
      <Image
        src={backgroundFaqs}
        alt="Learn Hero"
        loading="lazy"
        className="object-cover h-[70vh] w-screen"
      />
      <section
        aria-labelledby="promo-heading"
        className="absolute mx-auto inset-0 flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2
            id="promo-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Earn 5% of the Course Price by Inviting Friends!
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
            Share this course with your friends, and earn 5% of the price for
            each friend who signs up! Don’t miss this opportunity to learn
            together and save.
          </p>
          <a
            href="#"
            className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            Invite Friends Now
          </a>
        </div>
      </section>
    </div>
  );
}

export default HeroSectionPromo;
