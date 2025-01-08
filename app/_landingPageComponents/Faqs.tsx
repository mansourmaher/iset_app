import Image from "next/image";

import { Container } from "../_landingPageComponents/Container";
import backgroundImage from "../images/background-faqs.jpg";

const faqs = [
  [
    {
      question: "What types of courses are available on the platform?",
      answer:
        "Our platform offers a variety of courses, from technology and business to creative arts and personal development.",
    },
    {
      question: "Can I get a certificate after completing a course?",
      answer:
        "Yes, most courses offer a certificate of completion which you can add to your professional profile.",
    },
    {
      question: "How do I become an instructor on the platform?",
      answer:
        "We're always looking for skilled instructors! Contact us to discuss your course idea and we’ll guide you through the process.",
    },
  ],
  [
    {
      question: "Is there a way to get feedback on my assignments?",
      answer:
        "Absolutely! Many courses include graded assignments and peer reviews for in-depth feedback.",
    },
    {
      question: "Can I access the courses offline?",
      answer:
        "With our mobile app, you can download lessons to access offline anytime, anywhere.",
    },
    {
      question: "Are there any free courses available?",
      answer:
        "Yes, we offer a selection of free courses to help you get started with learning.",
    },
  ],
  [
    {
      question: "How can I reset my password?",
      answer:
        "Click on the 'Forgot Password' link on the login page, and follow the instructions to reset it.",
    },
    {
      question: "Will there be new courses added regularly?",
      answer:
        "Yes, we’re constantly updating our catalog with new and relevant courses across various subjects.",
    },
    {
      question: "What should I do if I experience technical issues?",
      answer:
        "Please contact our support team, and we’ll assist you with any technical difficulties you may encounter.",
    },
  ],
];


export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="container mx-auto ">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl ">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and if you’re lucky someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
