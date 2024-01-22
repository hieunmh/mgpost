import { create } from 'zustand';

interface useAggregationHeadType {
  menu: string;
  setMenu: (menu: string) => void;
}

export const useAggHead = create<useAggregationHeadType>(set => ({
  menu: 'statistical',
  setMenu: (menu: string) => set({ menu: menu })
})) 