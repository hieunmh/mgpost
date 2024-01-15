import { create } from 'zustand';

interface useSendAddressType {
  sendWard: string;
  sendDistrict: string;
  sendProvince: string;

  setSendWard: (ward: string) => void;
  setSendDistrict: (district: string) => void;
  setSendProvince: (province: string) => void;
  
}

export const useSendAddress = create<useSendAddressType>(set => ({
  sendWard: '',
  sendDistrict:'',
  sendProvince:'',

  setSendWard: (ward: string) => set({ sendWard: ward }),
  setSendDistrict: (district: string) => set({ sendDistrict: district }),
  setSendProvince: (province: string) => set({ sendProvince: province }),
}))