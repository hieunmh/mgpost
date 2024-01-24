import { UserInfoType } from '@/types/type';
import { create } from 'zustand';

interface useHeadDetailType {
  headDetail: UserInfoType & { transaction: { address: string } | null, aggregation: { address: string } | null } | null;
  setHeadDetail: (head: UserInfoType & { transaction: { address: string } | null, aggregation: { address: string } | null }) => void;
}

export const useHeadDetail = create<useHeadDetailType>(set => ({
  headDetail: null,
  setHeadDetail: (head: UserInfoType & { transaction: { address: string } | null, aggregation: { address: string } | null }) => set({ headDetail: head })
}))