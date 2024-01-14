import { WardType } from '@/types/type';
import { create } from 'zustand';

interface useDistrictType {
  wards: (WardType)[],
  setWards: (districts: WardType[]) => void;
}

export const useWard = create<useDistrictType>(set => ({
  wards: [],
  setWards: (wards: WardType[]) => set({ wards: wards })
}))