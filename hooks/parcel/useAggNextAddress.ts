import { create } from 'zustand';

interface useAggNextAddressType {
  isOpenNextAddress: boolean;
  setIsOpenNextAddress: (isOpen: boolean) => void;
}

export const useAggNextAddress = create<useAggNextAddressType>(set => ({
  isOpenNextAddress: false,
  setIsOpenNextAddress: (isOpen: boolean) => set({ isOpenNextAddress: isOpen })
}))