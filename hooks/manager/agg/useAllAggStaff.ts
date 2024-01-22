import { AggregationType, UserInfoType } from '@/types/type';
import { create } from 'zustand';

interface useAllAggStaffType {
  allAggStaff: (UserInfoType & { aggregation: AggregationType })[];
  setAllAggStaff: (allTranStaff: (UserInfoType & { aggregation: AggregationType })[]) => void;
}

export const useAllAggStaff = create<useAllAggStaffType>(set => ({
  allAggStaff: [],
  setAllAggStaff: (allTranStaff: (UserInfoType & { aggregation: AggregationType })[]) => set({ allAggStaff: allTranStaff})
}))