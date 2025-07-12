import { create } from 'zustand';

type UserState = {
  userNo: number;
  setUserNo: (userNo: number) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userNo: 0, // 초기값
  setUserNo: (userNo) => set({ userNo }),
}));