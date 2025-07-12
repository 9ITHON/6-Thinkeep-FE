import axios from 'axios';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID || '',
            clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
            // profile(profile) {
            //     return {
            //         id: profile.kakao_account?.profile?.nickname,
            //     }
            // }
        })
    ],
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt', // 세션 전략 확인
    },
    callbacks: {
        async jwt({ token, user, account }) {
            console.log("JWT Callback", {token, user, account});

            if (user) {
                // token에 내용을 실어보낼 수 있음
                // 아래 코드 같은 경우 name을 받을 수 있음
                token.name = user.name
            }

            const kakaoId = token.sub;
            const nickname = token.name;
            const profileImage = token.picture

            try {
                await axios.post('http://13.209.69.235:8080/api/auth/kakao-login', {
                    kakaoId: kakaoId,
                    nickname: nickname,
                    profileImage: profileImage,
                    valid: true,
                })
                console.log("백엔드 전송 성공")
            } catch (err) {
                console.log("백엔드 전송 실패", err)
            }

            return token;
        },
        async session({ session, token }) {
            console.log("Session Callback:", {session, token});

            // session 조회 할 때 아래 코드 같이 설정할 경우 토근에 보낸 값을 전부 볼 수 있음
            session.user = {
                name: token.name,
                email: token.sub,
                image: token.picture
            }

            return session;
        },
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET, // JWT 암호화 비밀 키
        maxAge: 60 * 60 * 24 * 30, // JWT 만료 시간: 30일 (초 단위)
    },
    debug: true,
};

export default NextAuth(authOptions);