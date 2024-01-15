import { create } from 'zustand';

interface useParcelDetailType {
  isOpenDetail: boolean;
  setIsOpenDetail: (isOpen: boolean) => void;
}

export const useParcelDetail = create<useParcelDetailType>(set => ({
  isOpenDetail: false,
  setIsOpenDetail: (isOpen: boolean) => set({ isOpenDetail: isOpen })
}))