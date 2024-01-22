import { AggregationType, UserInfoType } from '@/types/type';
import { create } from 'zustand';

interface useStaffDetailType {
  staffDetail: UserInfoType & { aggregation: AggregationType } | null,
  setStaffDetail: (staff: UserInfoType & { aggregation: AggregationType }) => void;
}

export const useAggStaffDetail = create<useStaffDetailType>(set => ({
  staffDetail: null,
  setStaffDetail: (staff: UserInfoType & { aggregation: AggregationType }) => set({ staffDetail: staff })
}))