import { create } from 'zustand';
import { ProvinceType } from '@/types/type';

interface useProvinceType {
  provinces: (ProvinceType)[];
  setProvinces: (provinces: ProvinceType[]) => void;
}

export const useProvince = create<useProvinceType>(set => ({
  provinces: [],
  setProvinces: (provinces: ProvinceType[]) => set({ provinces: provinces })
}))