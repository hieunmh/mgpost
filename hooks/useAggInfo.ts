import { AggregationPointType } from '@/types/type';
import { create } from 'zustand';

interface useAggInfoType {
  aggInfo: AggregationPointType | null;
  setAggInfo: (transactionInfo: AggregationPointType) => void;
}


export const useAggInfo = create<useAggInfoType>(set => ({
  aggInfo: null,
  setAggInfo: (aggInfo: AggregationPointType) => set({ aggInfo: aggInfo })
}))