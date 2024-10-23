// src/app/traits/[trait]/page.js
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import results from "../../data/result";
import Image from "next/image";

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

  const isSafari = () => {
    if (typeof navigator === "undefined") return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  };

  const handleDownload = (key, title) => {
    if (isSafari()) {
      alert("화면에 나올 이미지를 길게 눌러 저장하세요.");
      window.open(`/download-${key}.png`, "_blank");
    } else {
      const link = document.createElement("a");
      link.href = `/download-${key}.png`;
      link.download = `${title}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
        // imageUrl: `https://offtherecord.nicetomeetme.co.kr/download-${trait.key}.svg`,
        imageUrl: `https://offtherecord.nicetomeetme.co.kr/kakao-image-1.png`,
        link: {
          mobileWebUrl: `https://offtherecord.nicetomeetme.co.kr/traits/${trait.slug}`,
          webUrl: `https://offtherecord.nicetomeetme.co.kr/traits/${trait.slug}`,
        },
      },
      // buttons: [
      //   {
      //     title: "설문 시작하기",
      //     link: {
      //       mobileWebUrl: "https://offtherecord.nicetomeetme.co.kr",
      //       webUrl: "https://offtherecord.nicetomeetme.co.kr",
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

  const bgColors = {
    1: "#95D7FF",
    2: "#FAD03C",
    3: "#FF7EBB",
    4: "#50DB98",
    5: "#f4f4f4",
  };

  const bgImages = {
    1: "/result-bg-1.png",
    2: "/result-bg-2.png",
    3: "/result-bg-3.png",
    4: "/result-bg-4.png",
    5: "/result-bg-5.png",
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen pt-[60px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImages[trait.key]})` }}
    >
      <div className="h-[304px] flex flex-col items-center justify-center">
        <Image
          src={`/output-${trait.key}.svg`}
          alt={`${trait.title}`}
          width={
            trait.key === "1"
              ? 121
              : trait.key === "2"
              ? 190
              : trait.key === "3"
              ? 267
              : trait.key === "4"
              ? 345
              : 230
          }
          height={
            trait.key === "1"
              ? 34
              : trait.key === "2"
              ? 269
              : trait.key === "3"
              ? 322
              : trait.key === "4"
              ? 170
              : 228
          }
        />
      </div>
      <div className="mt-[32px] mb-[40px] flex flex-col items-center justify-center">
        <div className="font-meetme text-black text-center text-[25px] font-normal leading-[121%]">
          {trait.subtitle}
        </div>
        <div className="font-meetme text-black text-[43px] font-normal leading-[121%]">
          {trait.title}
        </div>
      </div>

      <div className="whitespace-pre-line w-[340px] text-center flex justify-center items-center px-[25px] py-[47px] flex-shrink-0 border border-solid border-black bg-white">
        <span
          style={{
            color: "#000",
            textAlign: "center",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "183%", // 29.28px
          }}
        >
          {trait.feature
            .split("**")
            .map((part, index) =>
              index % 2 === 1 ? <strong key={index}>{part}</strong> : part
            )}
        </span>
      </div>

      <div className="w-[340px] mt-[50px] mb-[20px] border border-solid border-black bg-white px-[25px] flex flex-col items-center">
        <div className="relative mb-[20px] mt-[40px]">
          <Image
            src={`/result-${trait.key}-1.png`}
            alt="나한테 이런 말로 속삭여요!"
            width={265}
            height={150}
          />
          <span className="font-meetme absolute inset-0 flex items-center justify-center text-black text-center text-xl font-normal leading-[183%]">
            나한테 이런 말로 속삭여요!
          </span>
        </div>
        {trait.whispers.map((whisper, index) => (
          <div
            key={index}
            className="text-black text-center text-base font-medium leading-[183%]"
          >
            "{whisper}"
          </div>
        ))}

        <div className="flex justify-center items-center my-[30px]">
          <Image src="/stroke.png" alt="Loading" width={340} height={1} />
        </div>

        <div className="relative mb-[20px]">
          <Image
            src={`/result-${trait.key}-2.png`}
            alt={`${trait.title}이 나를 지배할 때`}
            width={317}
            height={200}
            className="text-center"
          />
          <span className="font-meetme absolute inset-0 flex items-center justify-center text-black text-center text-xl font-normal leading-[183%]">
            {trait.title}
            {trait.title.charAt(trait.title.length - 1).match(/[가-힣]/)
              ? (trait.title.charAt(trait.title.length - 1).charCodeAt(0) -
                  44032) %
                  28 >
                0
                ? "이"
                : "가"
              : "이"}{" "}
            나를 지배할 때
          </span>
        </div>
        <div className="text-black text-center text-base font-medium leading-[183%] whitespace-pre-line">
          {trait.whenIamDominatedBy}
        </div>

        <div className="flex justify-center items-center my-[30px]">
          <Image src="/stroke.png" alt="Loading" width={340} height={1} />
        </div>

        <div className="relative mb-[20px]">
          <Image
            src={`/result-${trait.key}-3.png`}
            alt={`${trait.title}이 나와 조화롭게 지낼 때`}
            width={322}
            height={200}
            className="text-center"
          />
          <span className="font-meetme absolute inset-0 flex items-center justify-center text-black text-center text-xl font-normal leading-[183%]">
            {trait.title}
            {trait.title.charAt(trait.title.length - 1).match(/[가-힣]/)
              ? (trait.title.charAt(trait.title.length - 1).charCodeAt(0) -
                  44032) %
                  28 >
                0
                ? "이"
                : "가"
              : "이"}{" "}
            나와 조화롭게 지낼 때
          </span>
        </div>
        <div className="text-black text-center text-base font-medium leading-[183%] whitespace-pre-line">
          {trait.whenIamHarmoniousWith}
        </div>

        <div className="flex justify-center items-center my-[30px]">
          <Image src="/stroke.png" alt="Loading" width={340} height={1} />
        </div>

        <div className="relative mb-[20px]">
          <Image
            src={`/result-${trait.key}-4.png`}
            alt={`${trait.title}과 잘 지낼 수 있는 방법!`}
            width={317}
            height={200}
            className="text-center"
          />
          <span className="font-meetme absolute inset-0 flex items-center justify-center text-black text-center text-xl font-normal leading-[183%]">
            {trait.title}
            {trait.title.charAt(trait.title.length - 1).match(/[가-힣]/)
              ? (trait.title.charAt(trait.title.length - 1).charCodeAt(0) -
                  44032) %
                  28 >
                0
                ? "과"
                : "와"
              : "과"}{" "}
            잘 지낼 수 있는 방법!
          </span>
        </div>
        <div className="text-black text-center text-base font-medium leading-[183%] pb-[40px] whitespace-pre-line">
          {trait.howIGetAlongWith}
        </div>
      </div>

      <div className="text-black text-center text-[13px] font-medium leading-[154%] whitespace-pre-line my-3">
        {trait.summary}
      </div>

      <div className="flex w-[340px] justify-between mt-[30px] mb-[75px] px-[16px]">
        <div
          className="flex flex-col items-center justify-between cursor-pointer gap-[6px]"
          onClick={() => router.push("/")}
        >
          <Image src="/(1).svg" alt="Loading" width={63} height={100} />
          <span className="font-meetme">다시 테스트하기</span>
        </div>
        <div
          className="flex flex-col items-center justify-between cursor-pointer"
          onClick={shareMessage}
        >
          <Image src="/(2).svg" alt="Loading" width={70} height={100} />
          <span className="font-meetme">친구에게 보내기</span>
        </div>
        <div
          className="flex flex-col items-center justify-between cursor-pointer"
          onClick={() => handleDownload(trait.key, trait.title)}
        >
          <Image src="/(3).svg" alt="Loading" width={68} height={100} />
          <span className="font-meetme">이미지 다운 받기</span>
        </div>
      </div>
      <Image
        src="/meetme.svg"
        alt="Loading"
        width={90}
        height={90}
        className="mb-[60px]"
      />
    </div>
  );
}

TraitsPage.propTypes = {
  params: PropTypes.shape({
    trait: PropTypes.string.isRequired,
  }).isRequired,
};

export default TraitsPage;
