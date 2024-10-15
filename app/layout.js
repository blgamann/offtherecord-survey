// src/app/layout.js

import KakaoInitializer from "./components/KakaoInitializer";
import "./globals.css";

export const metadata = {
  title: "Off The Record Survey",
  description: "Discover your personality through a simple 10-question survey!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head></head>
      <body>
        {/* Include KakaoInitializer to load and initialize the Kakao SDK */}
        <KakaoInitializer />
        {children}
      </body>
    </html>
  );
}
