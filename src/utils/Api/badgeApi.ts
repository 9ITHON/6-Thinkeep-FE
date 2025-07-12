import api from "./axios";
import {
  BadgeRequest,
  BadgeResponse,
  UserBadgeRequest,
  UserBadgeResponse,
} from "@/types/badge";

export const badgeApi = {
  // 전체 뱃지 목록 조회
  getAllBadges: (): Promise<BadgeResponse[]> =>
    api.get("/badges").then((res) => res.data),

  // 특정 뱃지 조회
  getBadgeById: (badgeId: number): Promise<BadgeResponse> =>
    api.get(`/badges/${badgeId}`).then((res) => res.data),

  // 뱃지 등록
  createBadge: (data: BadgeRequest): Promise<BadgeResponse> =>
    api.post("/badges", data).then((res) => res.data),

  // 뱃지 수정
  updateBadge: (badgeId: number, data: BadgeRequest): Promise<BadgeResponse> =>
    api.put(`/badges/${badgeId}`, data).then((res) => res.data),

  // 뱃지 삭제
  deleteBadge: (badgeId: number): Promise<void> =>
    api.delete(`/badges/${badgeId}`),

  // 사용자에게 뱃지 수동 부여
  awardBadgeToUser: (data: UserBadgeRequest): Promise<UserBadgeResponse> =>
    api.post("/user-badges", data).then((res) => res.data),

  // 사용자 스트릭 증가 및 자동 뱃지 부여
  increaseStreak: (userNo: number): Promise<UserBadgeResponse | null> =>
    api.post(`/users/${userNo}/streak`).then((res) => res.data),
};
