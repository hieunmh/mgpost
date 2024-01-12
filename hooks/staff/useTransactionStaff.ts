import { create } from 'zustand';

interface useTransactionStaffType {
  menu: string;
  setMenu: (menu: string) => void;
}

export const useTransactionStaff = create<useTransactionStaffType>(set => ({
  menu: 'overview',
  setMenu: (menu: string) => set({ menu: menu })
})) 