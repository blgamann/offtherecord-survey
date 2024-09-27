// src/App.js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "./lib/supabase";

import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import questions from "./data/question";
import results from "./data/result";

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
        router.push(`/traits/${selectedTrait.slug}`);
      } catch (err) {
        console.error("Unexpected error:", err);
        // Optionally, handle unexpected errors
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
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-200 p-4">
      <div className="w-full max-w-lg md:max-w-2xl bg-white shadow-lg rounded-lg p-6">
        {currentQuestion === null && <StartScreen onStart={handleStart} />}
        {currentQuestion !== null && currentQuestion < questions.length && (
          <QuestionScreen
            question={questions[currentQuestion]}
            current={currentQuestion + 1}
            total={questions.length}
            onChoice={handleChoice}
          />
        )}
      </div>
    </div>
  );
}

export default App;
