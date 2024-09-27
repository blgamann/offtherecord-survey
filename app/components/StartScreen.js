// src/components/StartScreen.js

import React from "react";

const StartScreen = ({ onStart }) => {
  const shareMessage = () => {
    // window.Kakao.Share.sendScrap({
    //   requestUrl: "https://offtherecord-survey.vercel.app",
    // });
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "설문조사 하러가기",
        description: "나의 특성은 무엇일까?",
        imageUrl:
          "https://i.ibb.co/r4LLyXR/Clean-Shot-2024-09-19-at-09-27-46-2x.png",
        link: {
          mobileWebUrl: "https://offtherecord-survey.vercel.app",
          webUrl: "https://offtherecord-survey.vercel.app",
        },
      },
      buttons: [
        {
          title: "설문조사 하러가기",
          link: {
            mobileWebUrl: "https://offtherecord-survey.vercel.app",
            webUrl: "https://offtherecord-survey.vercel.app",
          },
        },
      ],
    });
  };

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
      <button
        id="kakaotalk-sharing-btn"
        className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
        onClick={shareMessage}
      >
        카카오톡으로 공유
      </button>
    </div>
  );
};

export default StartScreen;
