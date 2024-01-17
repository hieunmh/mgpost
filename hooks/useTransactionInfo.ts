import { TransactionPointType } from '@/types/type';
import { create } from 'zustand';

interface useTransactionInfoType {
  transactionInfo: TransactionPointType | null;
  setTransactionInfo: (transactionInfo: TransactionPointType) => void;
}


export const useTransactionInfo = create<useTransactionInfoType>(set => ({
  transactionInfo: null,
  setTransactionInfo: (transactionInfo: TransactionPointType) => set({ transactionInfo: transactionInfo })
}))