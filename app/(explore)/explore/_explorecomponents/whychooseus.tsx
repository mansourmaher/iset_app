import React from "react";
import { BookOpen, Users, Zap, Medal, Clock, Headphones } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function WhyChooseUs() {
  return (
    <section className="w-full py-4 md:py-4 lg:py-4 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <CardTitle className="mt-4 flex gap-2 items-center">
                <BookOpen className="h-6 w-6 " />
                Extensive Course Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access thousands of courses across various disciplines, ensuring
                you find the perfect match for your learning goals.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <CardTitle className="mt-4 flex gap-2 items-center">
                <Users className="h-6 w-6" />
                Expert Instructors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Learn from industry professionals and thought leaders who bring
                real-world experience to every lesson.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <CardTitle className="mt-4 flex gap-2 items-center">
                <Zap className="h-6 w-6" />
                Interactive Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Engage with hands-on projects, quizzes, and peer discussions to
                reinforce your understanding and retention.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <CardTitle className="mt-4 flex gap-2 items-center">
                <Medal className="h-6 w-6" />
                Recognized Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Earn industry-recognized certificates upon course completion to
                boost your resume and career prospects.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <CardTitle className="mt-4 flex gap-2 items-center">
                <Clock className="h-6 w-6" />
                Flexible Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Study at your own pace with lifetime access to course materials,
                fitting education into your busy schedule.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <CardTitle className="mt-4 flex gap-2 items-center">
                <Headphones className="h-6 w-6" />
                24/7 Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get help whenever you need it with our round-the-clock customer
                support and active community forums.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
