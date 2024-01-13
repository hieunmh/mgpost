import { create } from 'zustand';

interface useCreateParcelType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCreateParcel = create<useCreateParcelType>(set => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen: isOpen })
}))