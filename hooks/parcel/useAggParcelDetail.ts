import { create } from 'zustand';

interface useParcelDetailType {
  isOpenDetail: boolean;
  setIsOpenDetail: (isOpen: boolean) => void;
}

export const useAggParcelDetail = create<useParcelDetailType>(set => ({
  isOpenDetail: false,
  setIsOpenDetail: (isOpen: boolean) => set({ isOpenDetail: isOpen })
}))