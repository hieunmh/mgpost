import { Database } from './supabase';

export type UserInfoType = Database['public']['Tables']['users']['Row'];