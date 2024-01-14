import { Database } from './supabase';

export type ProvinceType = {
  code: number;
  name: string;
}

export type DisctrictType = {
  code: number;
  name: string;
  province_code: number;
}

export type WardType = {
  code: string;
  name: string;
}

export type UserInfoType = Database['public']['Tables']['users']['Row'];

export type PackageType = Database['public']['Tables']['packages']['Row'];

export type PackageDetailsType = Database['public']['Tables']['packageDetails']['Row'];

export type PackageStatusType = Database['public']['Tables']['packageStatus']['Row'];