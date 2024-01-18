import { TransactionPointType } from '@/types/type';
import { create } from 'zustand';

interface useAllTranByAggType {
  allTranByAgg: TransactionPointType[],
  setAllTranByAgg: (allTranByAgg: TransactionPointType[]) => void;
}

export const useAllTranByAgg = create<useAllTranByAggType>(set => ({
  allTranByAgg: [],
  setAllTranByAgg: (allTranByAgg: TransactionPointType[]) => set({ allTranByAgg: allTranByAgg })
})) 