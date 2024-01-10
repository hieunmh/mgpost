import { create } from 'zustand';

interface useMenuType {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
}

export const useMenu = create<useMenuType>(set => ({
  showMenu: false,
  setShowMenu: (show: boolean) => set({ showMenu: show })
})) 