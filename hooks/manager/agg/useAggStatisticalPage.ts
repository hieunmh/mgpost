import { create } from 'zustand';

interface useStatisticalPageType {
  page: number;
  perPage: number;
  numberPage: number;
  setNumberPage: (numberPage: number) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
}

export const useAggStatisticalPage = create<useStatisticalPageType>(set => ({
  page: 1,
  numberPage: 0,
  perPage: 2,
  setPage: (page: number) => set({ page: page }),
  setNumberPage: (numberPage: number) => set({ numberPage: numberPage }),
  setPerPage: (perPage: number) => set({ perPage: perPage })
}))