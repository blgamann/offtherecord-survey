// src/components/QuestionScreen.js

import React from "react";

const QuestionScreen = ({ question, current, total, onChoice }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-blue-700">
            문항 {current} / {total}
          </span>
          <span className="text-sm font-medium text-blue-700">진행 상황</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(current / total) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        질문 {current}: {question.text}
      </h2>

      <div className="flex flex-col w-full space-y-4">
        {Object.keys(question.choices).map((choiceKey) => (
          <button
            key={choiceKey}
            className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            onClick={() => onChoice(choiceKey)}
          >
            {question.choices[choiceKey]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionScreen;
