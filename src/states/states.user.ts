import { atom } from 'recoil';

export const USER_KEY = 'user';
export const DEFAULT_USER_NAME = 0;

export type UserState = {
  userNo: number;
};
export const userState = atom<UserState>({
  key: USER_KEY,
});