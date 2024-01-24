import { create } from 'zustand';

interface useShowHeadDetailType {
  isOpen: boolean,
  setIsOpen: (open: boolean) => void;
}

export const useShowHeadDetail = create<useShowHeadDetailType>(set => ({
  isOpen: false,
  setIsOpen: (open: boolean) => set({ isOpen: open })
}))