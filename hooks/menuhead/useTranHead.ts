import { create } from 'zustand';

interface useTransactionHeadType {
  menu: string;
  setMenu: (menu: string) => void;
}

export const useTranHead = create<useTransactionHeadType>(set => ({
  menu: 'statistical',
  setMenu: (menu: string) => set({ menu: menu })
})) 