// src/components/StartScreen.js

import React from "react";
import PropTypes from "prop-types";

/**
 * StartScreen Component
 *
 * This component serves as the introductory screen for the survey.
 * It displays a title, a brief description, and a button to start the survey.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onStart - Callback function to initiate the survey
 * @returns {JSX.Element}
 */
const StartScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-4">
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">설문조사</h1>
        <p className="text-lg text-gray-600 mb-8">
          간단한 10문항 설문을 통해 당신의 성향을 알아보세요!
        </p>

        <button
          type="button"
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={onStart}
          aria-label="Start Survey"
        >
          설문 시작하기
        </button>
      </div>
    </div>
  );
};

StartScreen.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartScreen;
