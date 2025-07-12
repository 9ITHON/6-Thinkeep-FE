import api from "./axios";
import {
  LoginRequest,
  KakaoLoginRequest,
  LoginResponse,
  UserInfo,
} from "@/types/auth";

export const authApi = {
  // 일반 로그인
  login: (data: LoginRequest): Promise<LoginResponse> =>
    api.post("/auth/login", data).then((res) => res.data),

  // 카카오 로그인
  kakaoLogin: (data: KakaoLoginRequest): Promise<LoginResponse> =>
    api.post("/auth/kakao-login", data).then((res) => res.data),

  // 로그아웃
  logout: (): Promise<LoginResponse> =>
    api.post("/auth/logout").then((res) => res.data),

  // 현재 사용자 정보 조회
  getCurrentUser: (): Promise<UserInfo> =>
    api.get("/auth/me").then((res) => res.data),
};
export default authApi;
