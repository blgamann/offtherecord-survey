// src/App.js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "./lib/supabase";

import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import questions from "./data/question";
import results from "./data/result";
import Image from "next/image";

const INITIAL_SCORES = {
  "나의 사감선생님": 0,
  "스마일 마스크": 0,
  "관심에 목마른, 스포터 라이트": 0,
  "무기력한 넝마 히피": 0,
  "합리화-카멜레온": 0,
};

function App() {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [scores, setScores] = useState({ ...INITIAL_SCORES });
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleRestart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setScores({ ...INITIAL_SCORES });
  };

  const handleChoice = async (choice) => {
    if (currentQuestion === null) return;

    const question = questions[currentQuestion];
    const selectedScores = question.scores[choice];

    // Calculate new scores based on the selected choice
    const newScores = { ...scores };
    Object.entries(selectedScores).forEach(([trait, value]) => {
      newScores[trait] += value;
    });

    // Update answers with the current choice
    const newAnswer = { question: currentQuestion + 1, choice };
    const updatedAnswers = [...answers, newAnswer];

    // Determine if it's the last question
    const isLastQuestion = currentQuestion + 1 >= questions.length;

    if (isLastQuestion) {
      setIsLoading(true);
      // Determine the result based on the updated scores
      const maxScore = Math.max(...Object.values(newScores));
      const topTraits = Object.keys(newScores).filter(
        (key) => newScores[key] === maxScore
      );

      // Handle ties by selecting the first trait (you can modify this as needed)
      const selectedTraitKey = topTraits[0];
      const selectedTrait = results[selectedTraitKey];

      try {
        console.log(updatedAnswers);
        console.log(updatedAnswers.length);
        // Insert the survey result into Supabase
        const { data, error } = await supabase
          .from("offtherecord-survey")
          .insert({
            answers: JSON.stringify(updatedAnswers),
            trait: selectedTrait.slug,
          })
          .select();

        if (error) {
          console.error("Error inserting data:", error);
          // Optionally, you can display an error message to the user here
        } else {
          console.log("Data inserted successfully:", data);
        }

        // Navigate to the result page
      } catch (err) {
        console.error("Unexpected error:", err);
        // Optionally, handle unexpected errors
      } finally {
        // Add a delay of 5 seconds before navigating to the result page
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push(`/traits/${selectedTrait.slug}`);
      }
    } else {
      // Proceed to the next question
      setCurrentQuestion(currentQuestion + 1);
    }

    // Update the state with the new scores and answers
    setScores(newScores);
    setAnswers(updatedAnswers);
  };

  const handleRestart = () => {
    setCurrentQuestion(null);
    setAnswers([]);
    setScores({ ...INITIAL_SCORES });
    setIsLoading(false);
  };

  const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-[50px]">
        <Image src="/loading.png" alt="Loading" width={149} height={199} />
        <div className="text-black text-center font-['Sandoll_Typewrite'] text-[23px] font-normal leading-[164%] whitespace-pre-wrap">
          {`내 안의 방해꾼\n찾는 중...`}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full bg-[url('/home-bg.png')] bg-cover bg-center bg-no-repeat">
        {currentQuestion === null && <StartScreen onStart={handleStart} />}
        {currentQuestion !== null &&
          currentQuestion < questions.length &&
          (isLoading ? (
            <Loading />
          ) : (
            <QuestionScreen
              question={questions[currentQuestion]}
              current={currentQuestion + 1}
              total={questions.length}
              onChoice={handleChoice}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
