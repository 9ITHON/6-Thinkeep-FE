import api from "./axios";
import {
  QuizSubmitRequest,
  QuizResponse,
  SkipStatusResponse,
  QuizResultSummary,
} from "@/types/quiz";

export const quizApi = {
  // 오늘 퀴즈 2개 생성
  getTodayQuizzes: (userNo: number): Promise<QuizResponse[]> =>
    api.get(`/quizzes/today?userNo=${userNo}`).then((res) => res.data),

  // 정답 제출 / 스킵
  submitQuiz: (data: QuizSubmitRequest): Promise<void> =>
    api.post("/quizzes/submit", data).then(() => {}),

  // 오늘의 건너뛰기 횟수 상태 조회
  getSkipStatus: (userNo: number): Promise<SkipStatusResponse> =>
    api
      .get(`/quizzes/today/skip-status?userNo=${userNo}`)
      .then((res) => res.data),

  // 오늘의 오답/스킵 퀴즈 전체 조회
  getWrongQuizzes: (userNo: number): Promise<QuizResponse[]> =>
    api.get(`/quizzes/today/wrong?userNo=${userNo}`).then((res) => res.data),

  // 오답 재시도 퀴즈 1개 조회
  getRetryNext: (userNo: number): Promise<QuizResponse | null> =>
    api
      .get(`/quizzes/today/retry-next?userNo=${userNo}`)
      .then((res) => (res.status === 204 ? null : res.data)),

  // 오늘 퀴즈 결과 요약
  getResultSummary: (userNo: number): Promise<QuizResultSummary> =>
    api.get(`/quizzes/today/result?userNo=${userNo}`).then((res) => res.data),

  // 단일 퀴즈 삭제
  deleteQuiz: (quizId: number, userNo: number): Promise<void> =>
    api.delete(`/quizzes/${quizId}?userNo=${userNo}`).then(() => {}),

  // 오늘 생성된 퀴즈 전체 삭제
  deleteTodayQuizzes: (userNo: number): Promise<void> =>
    api.delete(`/quizzes/today?userNo=${userNo}`).then(() => {}),

  // GPT 기반 퀴즈 1개 생성 (테스트용)
  generateTestQuiz: (data: {
    userNo: number;
    date: string;
  }): Promise<QuizResponse> =>
    api.post("/quizzes/generate", data).then((res) => res.data),
};
