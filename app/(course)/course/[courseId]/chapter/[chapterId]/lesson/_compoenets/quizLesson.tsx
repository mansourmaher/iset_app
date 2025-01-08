"use client"
import { useEffect, useState } from "react";

const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlink and Text Markup Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which tag is used to define an unordered list in HTML?",
    options: ["<ol>", "<li>", "<ul>", "<list>"],
    correctAnswer: 2,
  },
  {
    question:
      "What is the correct CSS syntax for making all the <p> elements bold?",
    options: [
      "p {text-size: bold;}",
      "p {font-weight: bold;}",
      "<p style='font-size: bold;'>",
      "p {style: bold;}",
    ],
    correctAnswer: 1,
  },
  // Add more questions as needed
];

function QuizLesson() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30); // Timer for each question
    const [isTabChanged, setIsTabChanged] = useState(false);
    const [navigationAttempts, setNavigationAttempts] = useState(0);
  
    // Timer logic
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timer);
      } else {
        handleNextQuestion(); 
      }
    }, [timeLeft]);
  
    
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          setIsTabChanged(true);
          setNavigationAttempts((attempts) => attempts + 1);
          if (navigationAttempts >= 2) {
            alert("You have navigated away too many times. Quiz will end.");
            setShowResult(true);
          }
        }
      };
  
      document.addEventListener("visibilitychange", handleVisibilityChange);
  
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, [navigationAttempts]);
  
    const handleAnswerSelect = (index: number) => {
      setSelectedAnswer(index);
    };
  
    const handleNextQuestion = () => {
      if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
  
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setTimeLeft(30); // Reset timer for next question
      } else {
        setShowResult(true);
      }
    };
  
    const resetQuiz = () => {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
      setTimeLeft(30);
      setIsTabChanged(false);
      setNavigationAttempts(0);
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg">
            <div className="p-6 border-b">
              <h1 className="text-xl font-bold">
                {showResult ? "Quiz Results" : "HTML and CSS Basics Quiz"}
              </h1>
              {isTabChanged && (
                <p className="text-red-500 mt-2">
                  Warning: You switched tabs! Focus on the quiz.
                </p>
              )}
            </div>
            <div className="p-6">
              {!showResult ? (
                <div>
                  <p className="text-sm mb-4">
                    Time Remaining: {timeLeft} seconds
                  </p>
                  <h2 className="text-lg font-semibold mb-4">
                    {quizData[currentQuestion].question}
                  </h2>
                  <div className="space-y-2">
                    {quizData[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-3 rounded-md ${
                          selectedAnswer === index
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-100 hover:bg-indigo-100"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className="mt-4 w-full p-3 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                  >
                    {currentQuestion === quizData.length - 1
                      ? "Finish Quiz"
                      : "Next Question"}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                  <p className="text-xl">
                    Your score: {score} out of {quizData.length}
                  </p>
                  <p className="mt-2">
                    {score === quizData.length
                      ? "Excellent! You've mastered the basics."
                      : "Keep practicing to improve your score!"}
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="mt-4 p-3 bg-green-500 text-white rounded-md"
                  >
                    Retake Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default QuizLesson;