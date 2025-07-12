import { CreateRequest } from "@/types/user";

export const isGeneralSignup = (req: CreateRequest): boolean => {
  return !!req.password && !req.kakaoId;
};

export const isKakaoSignup = (req: CreateRequest): boolean => {
  return !!req.kakaoId && !req.password;
};
