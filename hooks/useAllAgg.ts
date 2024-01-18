
import { AggregationPointType } from '@/types/type';
import { create } from 'zustand';

interface useAllAggType {
  allAgg: AggregationPointType[],
  setAllAgg: (allTranByAgg: AggregationPointType[]) => void;
}

export const useAllAgg = create<useAllAggType>(set => ({
  allAgg: [],
  setAllAgg: (allAgg: AggregationPointType[]) => set({ allAgg: allAgg })
})) 