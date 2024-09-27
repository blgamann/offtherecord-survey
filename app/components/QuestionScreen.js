// src/components/QuestionScreen.js

import React from "react";
import PropTypes from "prop-types";

/**
 * QuestionScreen Component
 *
 * This component displays a single question in the survey, along with its choices.
 * It also shows the current progress of the survey through a progress bar.
 *
 * @param {Object} props - Component props
 * @param {Object} props.question - The current question object containing text and choices
 * @param {number} props.current - The current question number
 * @param {number} props.total - The total number of questions
 * @param {Function} props.onChoice - Callback function invoked when a choice is selected
 * @returns {JSX.Element}
 */
const QuestionScreen = ({ question, current, total, onChoice }) => {
  // Calculate the progress percentage
  const progressPercentage = Math.min((current / total) * 100, 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-200 p-4">
      <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
        {/* Progress Indicator */}
        <div className="w-full mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">
              문항 {current} / {total}
            </span>
            <span className="text-sm font-medium text-blue-700">진행 상황</span>
          </div>
          <div
            className="w-full bg-gray-200 rounded-full h-2.5"
            aria-hidden="true"
          >
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={current}
              aria-valuemin="0"
              aria-valuemax={total}
              aria-label={`Progress: ${current} out of ${total} questions`}
            ></div>
          </div>
        </div>

        {/* Question Text */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          질문 {current}: {question.text}
        </h2>

        {/* Choices */}
        <div className="flex flex-col w-full space-y-4">
          {Object.entries(question.choices).map(([choiceKey, choiceValue]) => (
            <button
              key={choiceKey}
              type="button"
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              onClick={() => onChoice(choiceKey)}
              aria-label={`Choose option ${choiceKey}: ${choiceValue}`}
            >
              {choiceValue}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

QuestionScreen.propTypes = {
  question: PropTypes.shape({
    text: PropTypes.string.isRequired,
    choices: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChoice: PropTypes.func.isRequired,
};

export default QuestionScreen;
