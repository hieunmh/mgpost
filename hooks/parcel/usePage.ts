import { create } from 'zustand';

interface usePerPageType {
  page: number;
  numberPage: number;
  setNumberPage: (numberPage: number) => void;
  setPage: (perPage: number) => void;
}

export const usePage = create<usePerPageType>(set => ({
  page: 1,
  numberPage: 0,
  setPage: (page: number) => set({ page: page }),
  setNumberPage: (numberPage: number) => set({ numberPage: numberPage })
}))