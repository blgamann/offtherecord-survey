// src/app/layout.js

import KakaoInitializer from "./components/KakaoInitializer";
import "./globals.css";

export const metadata = {
  title: "오프더레코드 - 방해꾼의 방",
  description:
    "솔직한 나를 방해하는 내면의 비판자 <방해꾼의 방>, 있는 그대로의 나를 드러내지 못하게 하는 내면의 방해꾼을 발견해 보세요.",
  openGraph: {
    title: "오프더레코드 - 방해꾼의 방",
    description:
      "솔직한 나를 방해하는 내면의 비판자 <방해꾼의 방>, 있는 그대로의 나를 드러내지 못하게 하는 내면의 방해꾼을 발견해 보세요.",
    type: "website",
    url: "https://offtherecord.nicetomeetme.co.kr",
    images: [
      {
        url: "https://offtherecord.nicetomeetme.co.kr/opengraph-image.png",
        width: 340,
        height: 211,
        alt: "오프더레코드 - 방해꾼의 방",
      },
    ],
    siteName: "오프더레코드",
  },
  twitter: {
    card: "summary_large_image",
    title: "오프더레코드 - 방해꾼의 방",
    description:
      "솔직한 나를 방해하는 내면의 비판자 <방해꾼의 방>, 있는 그대로의 나를 드러내지 못하게 하는 내면의 방해꾼을 발견해 보세요.",
    images: ["https://offtherecord.nicetomeetme.co.kr/opengraph-image.png"],
  },
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
