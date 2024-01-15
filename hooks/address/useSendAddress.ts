import { create } from 'zustand';

interface useSendAddressType {
  sendDetail: string;
  sendWard: string;
  sendDistrict: string;
  sendProvince: string;

  setSendDetail: (detail: string) => void;
  setSendWard: (ward: string) => void;
  setSendDistrict: (district: string) => void;
  setSendProvince: (province: string) => void;
  
}

export const useSendAddress = create<useSendAddressType>(set => ({
  sendDetail: '',
  sendWard: '',
  sendDistrict:'',
  sendProvince:'',

  setSendDetail: (detail: string) => set({ sendDetail: detail }),
  setSendWard: (ward: string) => set({ sendWard: ward }),
  setSendDistrict: (district: string) => set({ sendDistrict: district }),
  setSendProvince: (province: string) => set({ sendProvince: province }),
}))