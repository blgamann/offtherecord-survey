// src/components/StartScreen.js

import React from "react";

const StartScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">설문조사</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        간단한 10문항 설문을 통해 당신의 성향을 알아보세요!
      </p>

      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={onStart}
      >
        설문 시작하기
      </button>
    </div>
  );
};

export default StartScreen;
