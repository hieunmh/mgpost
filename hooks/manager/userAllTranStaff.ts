import { TransactionType, UserInfoType } from '@/types/type';
import { create } from 'zustand';

interface useAllTranStaffType {
  allTranStaff: (UserInfoType & { transaction: TransactionType })[];
  setAllTranStaff: (allTranStaff: (UserInfoType & { transaction: TransactionType })[]) => void;
}

export const useAllTranStaff = create<useAllTranStaffType>(set => ({
  allTranStaff: [],
  setAllTranStaff: (allTranStaff: (UserInfoType & { transaction: TransactionType })[]) => set({ allTranStaff: allTranStaff})
}))