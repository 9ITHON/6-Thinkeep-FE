import api from "./axios";
import {
  RecordCreateRequest,
  RecordCreateResponse,
  TodayRecordStatus,
  RecordResponse,
} from "@/types/record";

export const recordApi = {
  // 오늘 일기 작성
  createToday: (data: RecordCreateRequest): Promise<RecordCreateResponse> =>
    api.post("/records", data).then((res) => res.data),

  // 오늘 기록 상태 조회
  getTodayStatus: (): Promise<TodayRecordStatus> =>
    api.get("/records/today").then((res) => res.data),

  // 특정 날짜 일기 조회
  getByDate: (date: string): Promise<RecordResponse> =>
    api.get(`/records/${date}`).then((res) => res.data),

  // 일기 수정
  update: (
    recordId: number,
    data: RecordCreateRequest
  ): Promise<RecordResponse> =>
    api.put(`/records/${recordId}`, data).then((res) => res.data),

  // 일기 삭제
  delete: (recordId: number): Promise<void> =>
    api.delete(`/records/${recordId}`).then(() => {}),
};
