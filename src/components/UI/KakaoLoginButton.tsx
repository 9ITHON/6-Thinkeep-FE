'use client';
import { signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCounterStore } from "@/providers/counter-store-provider";
import { useRouter } from "next/router";

const KakaoLoginButton = () => {
  const { data } = useSession();
  const { userNo, setUserNo } = useCounterStore((state) => state);
const router = useRouter()
  const handleLogin = async () => {
    await signIn("kakao" );
    router.push("/home");
    console.log("카카오 로그인 시도");

    try {
          const request = await axios.post('http://13.209.69.235:8080/api/auth/kakao-login', {
            kakaoId: data?.user?.email,
            nickname: data?.user?.name,
            profileImage: data?.user?.image,
          });
          console.log("백엔드 전송 성공");
          
          setUserNo(request.data.userNo); // 사용자 번호를 상태에 저장
          console.log("사용자 번호 저장 성공:", request.data.userNo);
          console.log("로그인한 사용자 정보:", userNo);

        } catch (err) {
          console.log("백엔드 전송 실패", err);
          console.log("백엔드 전송 실패", data?.user);
        }
  };

  return (
    <button
      onClick={handleLogin}
      className="relative w-[361px] h-[62px] bg-[#FEE500] rounded-[12px] flex items-center justify-center gap-2"
    >
      <Image src="/kakao_logo.svg" alt="kakao-icon" width={18} height={18} />

      <span className="text-black text-[20px] leading-[24px] font-semibold">
        카카오 로그인
      </span>
    </button>
  );
};

export default KakaoLoginButton;
