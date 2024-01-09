import { Database } from './supabase';

export type UserInfo = Database['public']['Tables']['users']['Row'];