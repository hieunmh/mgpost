import { create } from 'zustand';

interface useSendAddressType {
  reveiveDetail: string;
  receiveWard: string;
  receiveDistrict: string;
  receiveProvince: string;

  setReceiveDetail: (detail: string) => void;
  setReceiveWard: (ward: string) => void;
  setReceiveDistrict: (district: string) => void;
  setReceiveProvince: (province: string) => void;
  
}

export const useReceiveAddress = create<useSendAddressType>(set => ({
  reveiveDetail: '',
  receiveWard: '',
  receiveDistrict:'',
  receiveProvince:'',

  setReceiveDetail: (detail: string) => set({ reveiveDetail: detail }),
  setReceiveWard: (ward: string) => set({ receiveWard: ward }),
  setReceiveDistrict: (district: string) => set({ receiveDistrict: district }),
  setReceiveProvince: (province: string) => set({ receiveProvince: province }),
}))