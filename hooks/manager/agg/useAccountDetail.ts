import { create } from 'zustand';

interface useAccountDetailType {
  isOpenDetail: boolean;
  setIsOpenDetail: (isOpen: boolean) => void;
}

export const useAggAccountDetail = create<useAccountDetailType>(set => ({
  isOpenDetail: false,
  setIsOpenDetail: (isOpen: boolean) => set({ isOpenDetail: isOpen })
}))