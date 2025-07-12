'use client';
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCounterStore } from "@/providers/counter-store-provider";
import { useRouter } from "next/router";

const KakaoLoginButton = () => {
  const { data, status } = useSession();
  const { userNo, setUserNo } = useCounterStore((state) => state);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 세션 상태가 변경될 때마다 실행
  useEffect(() => {
    if (status === "authenticated" && data?.user) {
      handleBackendLogin();
    }
  }, [status, data]);

  const handleBackendLogin = async () => {
    setIsLoading(true);
    try {
      console.log("백엔드 로그인 시도:", data?.user);
      
      const request = await axios.post('http://13.209.69.235:8080/api/auth/kakao-login', {
        kakaoId: data?.user?.email,
        nickname: data?.user?.name,
        profileImage: data?.user?.image,
      });
      
      console.log("백엔드 전송 성공");
      setUserNo(request.data.userNo); // 사용자 번호를 상태에 저장
      console.log("사용자 번호 저장 성공:", request.data.userNo);
      
      // 백엔드 로그인 성공 후 홈으로 리다이렉트
      router.push("/home");
      
    } catch (err) {
      console.log("백엔드 전송 실패", err);
      console.log("백엔드 전송 실패", data?.user);
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (isLoading) return; // 로딩 중이면 중복 클릭 방지
    
    console.log("카카오 로그인 시도");
    setIsLoading(true);
    await signIn("kakao");
    // signIn 후에는 useEffect에서 처리하므로 여기서는 리다이렉트하지 않음
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className={`relative w-[361px] h-[62px] bg-[#FEE500] rounded-[12px] flex items-center justify-center gap-2 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <Image src="/kakao_logo.svg" alt="kakao-icon" width={18} height={18} />

      <span className="text-black text-[20px] leading-[24px] font-semibold">
        {isLoading ? "로그인 중..." : "카카오 로그인"}
      </span>
    </button>
  );
};

export default KakaoLoginButton;
