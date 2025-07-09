export interface ErrorResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

// 질문별 답변
export type RecordAnswers = {
  Q1: string;
  Q2: string;
  Q3: string;
  Q4: string;
};

// 일기 작성 요청
export interface RecordCreateRequest {
  answers: RecordAnswers;
}

// 일기 응답
export interface RecordResponse {
  recordId: number;
  userNo: number;
  date: string;
  answers: RecordAnswers;

  isComplete: boolean;
  isToday: boolean;
  createdAt: string;
  updatedAt: string;

  answerCount: number; // 답변한 질문 수
  statusMessage: string; // 상태 메시지
}

// 새로 획득한 뱃지
export interface UserBadgeResponse {
  userNo: number;
  badgeId: number;
  awardedAt: string;
}

// 일기 작성 응답
export interface RecordCreateResponse {
  record: RecordResponse;
  newBadge: UserBadgeResponse | null;
}

// 오늘 일기 상태 확인
export interface TodayRecordStatus {
  hasRecord: boolean; // 오늘 기록 존재 여부
  date: string; // 날짜
  record: RecordResponse | null; // 기록 내용 (있는 경우)

  canCreate: boolean; // 새 기록 생성 가능
  canEdit: boolean; // 수정 가능

  statusMessage: string; // 상태 메시지
  actionMessage: string; // 액션 안내 메시지
}
