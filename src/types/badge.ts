export interface BadgeRequest {
  name: string;
  description: string;
  conditionJson: string;
}

export interface BadgeResponse {
  badgeId: number;
  name: string;
  description: string;
  conditionJson: string;
}

export interface UserBadgeRequest {
  userNo: number;
  badgeId: number;
}

export interface UserBadgeResponse {
  userNo: number;
  badgeId: number;
  awardedAt: string; // YYYY-MM-DD HH:mm:ss
}
