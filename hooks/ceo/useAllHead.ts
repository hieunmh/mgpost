import { UserInfoType } from '@/types/type';
import { create } from 'zustand';

interface useAllHeadType {
  allHead: UserInfoType[];
  setAllHead: (allHead: UserInfoType[]) => void;
}

export const useAllHead = create<useAllHeadType>(set => ({
  allHead: [],
  setAllHead: (allHead: UserInfoType[]) => set({ allHead: allHead })
}))