import { UserInfoType } from '@/types/type';
import { create } from 'zustand';

interface useAllHeadType {
  allHead: (UserInfoType & { transaction: { address: string } | null, aggregation: { address: string } | null })[];
  setAllHead: (allHead: (UserInfoType & { transaction: { address: string } | null, aggregation: { address: string } | null })[]) => void;
}

export const useAllHead = create<useAllHeadType>(set => ({
  allHead: [],
  setAllHead: (allHead: (UserInfoType & { transaction: { address: string } | null, aggregation: { address: string } | null })[]) => set({ allHead: allHead })
}))