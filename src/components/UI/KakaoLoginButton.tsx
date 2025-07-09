import { signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";

const KakaoLoginButton = () => {
  const handleLogin = async () => {
    await signIn("kakao", {
      redirect: true,
      callbackUrl: "https://localhost:3000/home",
    });
    console.log("카카오 로그인 시도");
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
