import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (JWT 자동 주입)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // 토큰 만료 -> 로그아웃 처리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");

      // 로그인 페이지로 이동
      window.location.href = "/login";
    }

    if (status === 403) {
      alert("권한이 없습니다.");
    }

    return Promise.reject(error);
  }
);

export default api;
