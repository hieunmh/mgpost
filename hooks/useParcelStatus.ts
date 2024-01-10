import { create } from 'zustand';

interface useParcelStatusType {
  showParcelStatus: boolean;
  setShowParcelStatus: (show: boolean) => void;
}

export const useParcelStatus = create<useParcelStatusType>(set => ({
  showParcelStatus: false,
  setShowParcelStatus: (show: boolean) => set({ showParcelStatus: show })
})) 