import api from "./axios";
import {
  CreateRequest,
  Response,
  UpdateRequest,
  UserBadgeResponse,
} from "@/types/user";

export const userApi = {
  // 회원가입 (일반 or 카카오)
  signup: (data: CreateRequest): Promise<Response> =>
    api.post("users", data).then((res) => res.data),

  // 사용자 조회 (userNo 기준)
  getById: (userNo: number): Promise<Response> =>
    api.get(`/users/${userNo}`).then((res) => res.data),

  // 사용자 조회 (닉네임 기준)
  getByNickname: (nickname: string): Promise<Response> =>
    api.get(`/users/nickname/${nickname}`).then((res) => res.data),

  // 전체 사용자 목록 조회
  getAll: (): Promise<Response[]> => api.get("/users").then((res) => res.data),

  // 사용자 정보 수정
  update: (userNo: number, data: UpdateRequest): Promise<Response> =>
    api.put(`/users/${userNo}`, data).then((res) => res.data),

  // 사용자 삭제
  delete: (userNo: number): Promise<void> =>
    api.delete(`/users/${userNo}`).then(() => {}),

  // 스트릭 카운트 증가 및 뱃지 자동 부여
  increaseStreak: (userNo: number): Promise<UserBadgeResponse | null> =>
    api.post(`/users/${userNo}/streak`).then((res) => res.data),
};
