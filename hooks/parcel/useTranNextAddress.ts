import { create } from 'zustand';

interface useTranNextAddressType {
  isOpenNextAddress: boolean;
  setIsOpenNextAddress: (isOpen: boolean) => void;
}

export const useTranNextAddress = create<useTranNextAddressType>(set => ({
  isOpenNextAddress: false,
  setIsOpenNextAddress: (isOpen: boolean) => set({ isOpenNextAddress: isOpen })
}))