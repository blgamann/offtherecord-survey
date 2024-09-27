// src/app/traits/[trait]/page.js
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import results from "../../data/result";

/**
 * TraitsPage Component
 *
 * This component displays detailed information about a specific trait.
 * It includes features such as sharing the trait via KakaoTalk and restarting the survey.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.trait - The slug of the trait to display
 * @returns {JSX.Element}
 */
function TraitsPage({ params }) {
  const router = useRouter();
  const { trait: traitSlug } = params;

  // Find the trait based on the slug
  const traitKey = Object.keys(results).find(
    (key) => results[key].slug === traitSlug
  );

  const trait = traitKey ? results[traitKey] : null;

  useEffect(() => {
    if (!trait) {
      // Optionally, redirect to a 404 page or display a not found message
      // router.replace("/404");
    }
  }, [trait, router]);

  /**
   * Initializes Kakao SDK if not already initialized
   */
  const initializeKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  };

  useEffect(() => {
    // Load Kakao SDK script
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      initializeKakao();
    };
    document.body.appendChild(script);

    // Cleanup script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  /**
   * Handles sharing the trait via KakaoTalk
   */
  const shareMessage = () => {
    if (!window.Kakao) {
      alert("카카오톡 공유 기능을 사용할 수 없습니다.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      initializeKakao();
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: trait.title,
        description: trait.feature,
        imageUrl:
          "https://i.ibb.co/r4LLyXR/Clean-Shot-2024-09-19-at-09-27-46-2x.png",
        link: {
          mobileWebUrl: `https://offtherecord-survey.vercel.app/traits/${trait.slug}`,
          webUrl: `https://offtherecord-survey.vercel.app/traits/${trait.slug}`,
        },
      },
      // buttons: [
      //   {
      //     title: "설문 시작하기",
      //     link: {
      //       mobileWebUrl: "https://offtherecord-survey.vercel.app",
      //       webUrl: "https://offtherecord-survey.vercel.app",
      //     },
      //   },
      // ],
    });
  };

  // If trait is not found, display a not found message
  if (!trait) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Trait Not Found
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            요청하신 특성을 찾을 수 없습니다. URL을 다시 확인해주세요.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            aria-label="Go Back to Home"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-200 p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        {/* Trait Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {trait.title}
        </h1>

        {/* Feature Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">특징</h2>
          <p className="text-lg text-gray-700">{trait.feature}</p>
        </section>

        {/* Visual Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            시각적 요소
          </h2>
          <p className="text-lg text-gray-700">{trait.visual}</p>
        </section>

        {/* Keywords Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">키워드</h2>
          <ul className="list-disc list-inside space-y-1">
            {trait.keywords.map((keyword, index) => (
              <li key={index} className="text-gray-600">
                {keyword}
              </li>
            ))}
          </ul>
        </section>

        {/* Whispers Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            나에게 이런 말로 속삭여요!
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {trait.whispers.map((whisper, index) => (
              <li key={index} className="text-gray-600">
                {whisper}
              </li>
            ))}
          </ul>
        </section>

        {/* Impacts Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Impacts!
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {trait.impacts.map((impact, index) => (
              <li key={index} className="text-gray-600">
                {impact}
              </li>
            ))}
          </ul>
        </section>

        {/* Solution Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Solution!
          </h2>
          <p className="text-lg text-gray-700">{trait.solution}</p>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            aria-label="Restart Survey"
          >
            다시 시작하기
          </button>

          <button
            onClick={shareMessage}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
            aria-label="Share via KakaoTalk"
          >
            카카오톡으로 공유
          </button>
        </div>
      </div>
    </div>
  );
}

TraitsPage.propTypes = {
  params: PropTypes.shape({
    trait: PropTypes.string.isRequired,
  }).isRequired,
};

export default TraitsPage;
