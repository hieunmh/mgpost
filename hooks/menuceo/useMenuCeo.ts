import { create } from 'zustand';

interface useMenuCeoType {
  menu: string;
  setMenu: (menu: string) => void;
}

export const useMenuCeo = create<useMenuCeoType>(set => ({
  menu: 'manager',
  setMenu: (menu: string) => set({ menu: menu })
})) 