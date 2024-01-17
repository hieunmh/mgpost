import { create } from 'zustand';

interface useAggregationStaffType {
  menu: string;
  setMenu: (menu: string) => void;
}

export const useAggStaff = create<useAggregationStaffType>(set => ({
  menu: 'overview',
  setMenu: (menu: string) => set({ menu: menu })
})) 