"use client";

import React, { useState } from "react";
import Image from "next/image";
import Toggle from "@/components/UI/Toggle";

const OptionPage = () => {
  const [isTextBig, setIsTextBig] = useState(false);
  const [isAlarmOn, setIsAlarmOn] = useState(true);

  return (
    <div className="relative w-full h-screen text-white flex justify-center">
      <div className="relative w-full h-full">
        <Image
          src="/images/home_background_img.png"
          alt="배경"
          fill
          className="object-cover z-0"
          priority
        />

        <div className="relative z-10 px-6 pt-[70px] pb-[120px]">
          <button className="absolute top-4 right-6 text-sm text-white bg-[#2D2D29] px-4 py-2 rounded-[15px]">
            수정하기
          </button>

          {/* 프로필 영역 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/images/profile_img.png"
                alt="프로필"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold text-[18px]">띵킵</p>
                <p className="text-[18px] font-semibold text-[#7C7C7C]">
                  2002.06.15
                </p>
              </div>
            </div>
          </div>

          {/* 함께한 날짜 */}
          <div className="mt-5 w-full py-4 rounded-[15px] bg-[#7C7C7C] text-center text-[18px] font-semibold text-[#090909] backdrop-blur-[125px]">
            띵킵과 함께한지 <span className="text-[#FFF782]">77</span>일
          </div>

          {/* 설정 항목 */}
          <div className="mt-6 space-y-5 text-[18px] text-[#fafaf8] font-normal">
            <div className="border-t border-white/10 pt-5">
              <p>사용가이드 다시보기</p>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-5">
              <p>글자 더 크게</p>
              <Toggle
                isOn={isTextBig}
                onToggle={() => setIsTextBig((p) => !p)}
              />
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-5">
              <p>알림 설정</p>
              <Toggle
                isOn={isAlarmOn}
                onToggle={() => setIsAlarmOn((p) => !p)}
              />
            </div>

            <div className="border-t border-white/10 pt-5 space-y-3 ">
              <p className="text-[18px]">고객센터</p>
              <div className="flex flex-col text-[16px] pl-3 gap-3">
                <p>문의하기</p>
                <p>약관 및 개인정보처리 동의</p>
                <p>회원정보 관리</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionPage;
