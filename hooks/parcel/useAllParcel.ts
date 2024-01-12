import { PackageDetailsType, PackageStatusType, PackageType } from '@/types/type';
import { create } from 'zustand';

interface useAllParcelType {
  allParcel: (PackageType & { packageDetails: PackageDetailsType, packageStatus: PackageStatusType[]})[],
  setAllParcel: (allParcel: (PackageType & { packageDetails: PackageDetailsType, packageStatus: PackageStatusType[]})[]) => void;
}

export const useAllParcel = create<useAllParcelType>(set => ({
  allParcel: [],
  setAllParcel: (allParcel: (PackageType & { packageDetails: PackageDetailsType, packageStatus: PackageStatusType[]})[]) => set({ allParcel: allParcel })
})) 