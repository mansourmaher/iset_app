"use client";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { Loader } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { getAllQuizBylesson } from "@/actions/lesson/lesson";

interface ConfirmModelProps {
  initialQuiz?: Awaited<ReturnType<typeof getAllQuizBylesson>>;
}

export const QuizPreview = ({ initialQuiz }: ConfirmModelProps) => {
  const [quiz, setQuiz] = useState(initialQuiz?.quiz);
  const [isOpen, setIsOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [options, setOptions] = useState([]);

  const [isloading, setIsloading] = useState(false);

  const hadeldeletequiz = async (id: string) => {
    setIsloading(true);
    
    setIsloading(false);

  };
  

  const cureentQuestion = useMemo(() => {
    //@ts-ignore
    console.log(quiz[questionIndex]);
    //@ts-ignore
    setOptions(quiz[questionIndex]?.options[0].options);
    //@ts-ignore
    // setId(quiz[questionIndex]?.id);
    return quiz[questionIndex];
  }, [questionIndex, quiz, isloading]);

  const handleShowQuiz = async () => {
    setIsOpen(true);
  };

  return (
    <>
      <Toaster />
      <AlertDialog onOpenChange={() => setIsOpen(!isOpen)}>
        <AlertDialogTrigger
          className="flex items-center gap-x-2"
          onClick={handleShowQuiz}
          asChild
        >
          <Button className="rounded-full p-4" size="sm" variant="ghost">
            <span>Try Quiz</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[40%]">
          <div className="flex flex-row justify-between">
            <AlertDialogTitle>Quizzes for Your Chapter</AlertDialogTitle>
          </div>

          <AlertDialogDescription>
            <div className="mb-6 mt-6">
              {/* <Stepper steps={quiz} currentStep={questionIndex + 1}  isFalse={isFalse} /> */}
            </div>
            {cureentQuestion ? (
              <div>
                <div>
                  <h1
                    dangerouslySetInnerHTML={{
                      // @ts-ignore

                      __html: cureentQuestion.question,
                    }}
                  />
                </div>
                {options.map((option, index) => (
                  <div key={index}>
                    <Button
                      onClick={() => {}}
                      className="justify-start w-full mb-3 mt-6"
                    >
                      {index + 1}. {option}
                    </Button>
                  </div>
                ))}
              </div>
            ) : null}
          </AlertDialogDescription>

          <AlertDialogFooter className="flex items-center space-x-4 px-6">
            <Button
              type="button"
              onClick={() => {
                setQuestionIndex(questionIndex - 1);
              }}
              className="flex-1"
              variant={"green"}
              disabled={questionIndex === 0}
            >
              Previews
            </Button>

            <Button
              type="button"
              onClick={() => {
                //@ts-ignore
                hadeldeletequiz(quiz[questionIndex]?.id);
              }}
              variant={"destructive"}
              className="flex-1"
              //@ts-ignore
              disabled={!quiz[questionIndex]?.id || isloading}
            >
              {isloading ? <Loader className="animate-spin" /> : "Delete"}
            </Button>

            <Button
              type="button"
              onClick={() => {
                setQuestionIndex(questionIndex + 1);
              }}
              className="flex-1"
              variant={"primary"}
              disabled={questionIndex === quiz?.length! - 1}
            >
              Next
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
        <AlertDialogOverlay />
      </AlertDialog>
    </>
  );
};

export default QuizPreview;
