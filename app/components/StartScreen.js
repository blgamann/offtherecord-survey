// src/components/StartScreen.js

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";

const StartScreen = ({ onStart }) => {
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [n, setN] = useState(0);

  const handleStartClick = () => {
    setShowHomeScreen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { count, error } = await supabase
          .from("off-the-record")
          .select("*", { count: "exact", head: true });
        setN(count);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (showHomeScreen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          src="/home-1.svg"
          alt="Off The Record"
          width={274}
          height={274}
        />
        <Image
          src="/home-2.svg"
          alt="Off The Record"
          width={97}
          height={97}
          className="pt-[19px]"
        />
        <Image
          src="/home-3.svg"
          alt="Off The Record"
          width={340}
          height={300}
          className="pt-[33px] pb-[40px]"
        />
        <div className="relative w-[300px] h-[85px] flex items-center justify-center">
          <Image
            src="/home-4.svg"
            alt="Off The Record"
            layout="fill"
            objectFit="contain"
          />
          <button
            className="absolute text-center z-10 w-full h-full cursor-pointer font-meetme"
            onClick={handleStartClick}
            style={{ color: "#000", fontSize: "27px", fontWeight: 400 }}
          >
            방해꾼 찾으러 가기
          </button>
        </div>
        {n > 0 && (
          <p className="text-center text-black font-pretendard text-[13px] font-medium leading-[147%] pt-[35px]">
            {n}명이 테스트에 참여했어요.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="font-meetme whitespace-pre-line"
        style={{
          width: "288px",
          flexShrink: 0,
          color: "#000",
          textAlign: "center",
          fontSize: "23px",
          fontStyle: "normal",
          fontWeight: 400,
        }}
      >
        {`우리 모두의 내면에는 방해꾼이
살고 있어요.`}
      </div>
      <div className="text-black text-center text-base font-medium leading-[147%] whitespace-pre-wrap mt-[50px]">
        {`내 안의 비판자는 나 자신과 잘 지낼 때는
동기부여가 되지만, 나를 지배할 때는
내가 무언가를 시도할 때마다 과도한 비판을
통해 불안감을 조성하는 방해꾼이
되기도 합니다.

내 안의 방해꾼은 어떤 모습일지
지금 테스트해 보세요!`}
      </div>
      <button
        type="button"
        className="w-[286px] h-[85px] border border-black bg-[#D9D9D9] text-black text-center text-[27px] font-medium mt-[70px]"
        onClick={onStart}
        aria-label="Start Survey"
      >
        테스트 시작!
      </button>
    </div>
  );
};

StartScreen.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartScreen;
