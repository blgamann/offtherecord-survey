// src/components/KakaoInitializer.js
"use client";

import { useEffect } from "react";
import Script from "next/script";

/**
 * KakaoInitializer Component
 *
 * This component loads and initializes the Kakao SDK.
 * It should be included once in the application, preferably in the RootLayout.
 *
 * @returns {JSX.Element}
 */
const KakaoInitializer = () => {
  const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

  useEffect(() => {
    // Check if Kakao SDK is already initialized
    if (window.Kakao && window.Kakao.isInitialized()) {
      console.log("Kakao SDK is already initialized.");
      return;
    }

    // Initialize Kakao SDK
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoApiKey);
      console.log("Kakao SDK initialized successfully.");
    } else {
      console.warn("Kakao SDK is not available.");
    }
  }, [kakaoApiKey]);

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      strategy="beforeInteractive" // Load before the page becomes interactive
      integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
      crossOrigin="anonymous"
      onLoad={() => {
        // Initialization is handled in useEffect
      }}
      onError={(e) => {
        console.error("Failed to load Kakao SDK script.", e);
      }}
    />
  );
};

export default KakaoInitializer;
