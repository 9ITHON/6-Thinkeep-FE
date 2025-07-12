// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'

export type CounterState = {
  userNo: number
}

export type CounterActions = {
  decrementCount: () => void
  incrementCount: () => void
  setUserNo: (a : number) => void
}

export type CounterStore = CounterState & CounterActions

export const initCounterStore = (): CounterState => {
  return { userNo: 62 }
}

export const defaultInitState: CounterState = {
  userNo: 0,
}

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ userNo: state.userNo - 1 })),
    incrementCount: () => set((state) => ({ userNo: state.userNo + 1 })),
    setUserNo: (a) => set(() => ({ userNo: a }))
  }))
}
