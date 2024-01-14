import { DisctrictType } from '@/types/type';
import { create } from 'zustand';

interface useDistrictType {
  districts: (DisctrictType)[],
  setDistricts: (districts: DisctrictType[]) => void;
}

export const useDistrict = create<useDistrictType>(set => ({
  districts: [],
  setDistricts: (districts: DisctrictType[]) => set({ districts: districts })
}))