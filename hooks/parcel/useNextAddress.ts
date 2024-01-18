import { create } from 'zustand';

interface useNextAddressType {
  isOpenNextAddress: boolean;
  setIsOpenNextAddress: (isOpen: boolean) => void;
}

export const useNextAddress = create<useNextAddressType>(set => ({
  isOpenNextAddress: false,
  setIsOpenNextAddress: (isOpen: boolean) => set({ isOpenNextAddress: isOpen })
}))