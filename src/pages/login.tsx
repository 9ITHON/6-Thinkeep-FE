'use client'

import { signIn } from 'next-auth/react';
import React from 'react';

const KakaoLoginButton = () => {

  const handleLogin = async () => {
    await signIn('kakao', { redirect: true, callbackUrl: 'https://localhost:3000/home' })
    console.log('카카오 로그인 시도');
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 font-bold text-black"
    >
      카카오 로그인
    </button>
  );
};

const LoginPage = () => {
    return (
    <div>
        <KakaoLoginButton />
    </div>
    )
}

export default LoginPage;