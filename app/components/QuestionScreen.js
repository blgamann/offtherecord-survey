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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span
        style={{
          visibility: current === 5 || current === 9 ? "visible" : "hidden",
          color: "#000",
          textAlign: "center",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "164%",
        }}
        className="pb-[8px]"
      >
        {current === 5 ? "절반이나 왔어요!" : "거의 끝났어요!"}
      </span>
      <span
        style={{
          color: "#000",
          textAlign: "center",
          fontSize: "23px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "164%",
        }}
      >
        Q{current}.
      </span>
      <div className="flex flex-col items-center justify-center text-center whitespace-pre-wrap pt-[42px] pb-[147px]"
        style={{
          color: "#000",
          textAlign: "center",
          fontSize: "23px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "164%",
        }}
      >
        {question.text}
      </div>
      {/* Choices */}
      <div className="flex flex-col items-center justify-center gap-[14px]">
        {Object.entries(question.choices).map(([choiceKey, choiceValue]) => (
          <button
            key={choiceKey}
            type="button"
            className="w-[286px] h-[85px] border border-black bg-[#D9D9D9] text-black text-center text-[16px] font-medium whitespace-pre-wrap"
            onClick={() => onChoice(choiceKey)}
            aria-label={`Choose option ${choiceKey}: ${choiceValue}`}
          >
            {choiceValue}
          </button>
        ))}
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
