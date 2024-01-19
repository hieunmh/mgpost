import { create } from 'zustand';

interface useTransactionStaffType {
  menu: string;
  setMenu: (menu: string) => void;
}

export const useTransactionStaff = create<useTransactionStaffType>(set => ({
  menu: 'warehouse',
  setMenu: (menu: string) => set({ menu: menu })
})) 