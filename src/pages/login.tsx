"use client";

import React from "react";
import Image from "next/image";
import KakaoLoginButton from "@/components/UI/KakaoLoginButton";
import AppBackground from "@/components/APP/AppBackground";
// import { useSession } from "next-auth/react";

const LoginPage = () => {
  //   const { data, update, status } = useSession();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* <p>{data?.user?.name || "이름 없음"}님 환영합니다!</p>
      <p>로그인 상태: {status}</p>
      <p>update 정보: {JSON.stringify(update, null, 2)}</p>
      <p>data 정보: {JSON.stringify(data, null, 2)}</p> */}
      <AppBackground backgroundImage="/images/home_background_img.png">
        <div className="relative z-30 flex flex-col h-full pt-[70px] px-6">
          <div className="text-start leading-tight mb-11">
            <p className="text-[32px] font-semibold text-primary">
              하루 5분<span className="text-white">으로</span>
            </p>
            <p className="text-[24px] font-semibold text-primary mt-2">
              당신의 <span className="text-white">추억이</span>
              <br />더 오래 <span className="text-white">남을 수 있도록</span>
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-full mt-20 mb-4">
            <Image
              src="/thinkeep_symbol.svg"
              alt="symbol"
              width={160}
              height={120}
              className="mb-4"
            />
            <Image
              src="/thinkeep_logo.svg"
              alt="logo"
              width={160}
              height={50}
            />
          </div>

          <div className="absolute bottom-30 left-1/2 -translate-x-1/2">
            <KakaoLoginButton />
          </div>
        </div>
      </AppBackground>
    </div>
  );
};

export default LoginPage;
