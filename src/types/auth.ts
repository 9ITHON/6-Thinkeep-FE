export interface LoginRequest {
  nickname: string;
  password: string;
}

export interface KakaoLoginRequest {
  kakaoId: string;
  nickname: string;
  profileImage: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  userNo: number;
  nickname: string;
  isKakaoUser: boolean;
  accessToken: string;
  expiresIn: number;
}

export interface UserInfo {
  userNo: number;
  nickname: string;
  profileImage: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  birthDate: string; // YYYY-MM-DD 형식
  streakCount: number;
  isKakaoUser: boolean;
  createdAt: string; // YYYY-MM-DDTHH:mm:ss 형식
}
