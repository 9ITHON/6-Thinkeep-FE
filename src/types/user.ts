export interface CreateRequest {
  nickname: string;
  password: string;
  kakaoId: string;
  profileImage: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  birthDate: string; // YYYY-MM-DD 형식
}

export interface UpdateRequest {
  profileImage: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  birthDate: string; // YYYY-MM-DD 형식
  password: string;
}

export interface Response {
  userNo: number;
  nickname: string;
  profileImage: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  birthDate: string; // YYYY-MM-DD 형식
  streakCount: number;
  isKakaoUser: boolean;
  createdAt: string; // YYYY-MM-DDTHH:mm:ss 형식
  updatedAt: string; // YYYY-MM-DDTHH:mm:ss 형식
}

export interface UserBadgeResponse {
  userNo: number;
  badgeId: number;
  awardedAt: string; // YYYY-MM-DDTHH:mm:ss 형식
}
