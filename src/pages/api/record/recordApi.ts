import axios from "axios";
import {
  RecordCreateRequest,
  RecordCreateResponse,
  RecordResponse,
  TodayRecordStatus,
} from "@/types/record";

// 개발용 userNo (개발 환경에서만 사용)
const DEV_USER_NO = 10;

/**
 * 공통 헤더 설정 (JWT or 개발용 userNo)
 */
const getConfig = (options?: { userNo?: number }) => {
  const headers: Record<string, string> = {};

  // 1. 배포 환경: JWT 사용
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    return { headers };
  }

  // 2. 개발 환경: userNo 쿼리 파라미터 사용
  const userNo = options?.userNo ?? DEV_USER_NO;
  return {
    params: { userNo },
  };
};

/**
 * 오늘 일기 작성 (POST /api/records)
 */
export const createRecord = async (
  data: RecordCreateRequest,
  userNo?: number
): Promise<RecordCreateResponse> => {
  const res = await axios.post("/api/records", data, getConfig({ userNo }));
  return res.data;
};

/**
 * 오늘 기록 상태 조회 (GET /api/records/today)
 */
export const fetchTodayRecordStatus = async (
  userNo?: number
): Promise<TodayRecordStatus> => {
  const res = await axios.get("/api/records/today", getConfig({ userNo }));
  return res.data;
};

/**
 * 특정 날짜 일기 조회 (GET /api/records/{date})
 */
export const fetchRecordByDate = async (
  date: string,
  userNo?: number
): Promise<RecordResponse> => {
  const res = await axios.get(`/api/records/${date}`, getConfig({ userNo }));
  return res.data;
};

/**
 * 일기 수정 (PUT /api/records/{recordId})
 */
export const updateRecord = async (
  recordId: number,
  data: RecordCreateRequest,
  userNo?: number
): Promise<RecordResponse> => {
  const res = await axios.put(
    `/api/records/${recordId}`,
    data,
    getConfig({ userNo })
  );
  return res.data;
};

/**
 * 일기 삭제 (DELETE /api/records/{recordId})
 */
export const deleteRecord = async (
  recordId: number,
  userNo?: number
): Promise<void> => {
  await axios.delete(`/api/records/${recordId}`, getConfig({ userNo }));
};
