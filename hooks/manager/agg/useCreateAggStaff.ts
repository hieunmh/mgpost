import { create } from 'zustand';

interface useCreateAccountType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCreateAggAccount = create<useCreateAccountType>(set => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen: isOpen })
}))