import { DisctrictType, ProvinceType, UserInfoType, WardType } from '@/types/type';
import { User } from '@supabase/auth-helpers-nextjs';
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useProvince } from './address/useProvince';
import { useDistrict } from './address/useDistrict';
import { formatVN } from '@/actions/filterVN';
import { useWard } from './address/useWard';


type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userInfo: UserInfoType |null;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propsName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;

  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  const { provinces, setProvinces } = useProvince();
  const { districts, setDistricts } = useDistrict();
  const { wards, setWards } = useWard();

  const getUserInfo = () => supabase.from('users').select('*').eq('id', user?.id).single();

  useEffect(() => {
    
    const fetch = async () => {
      if (user && !isLoadingData && !userInfo) {
        setIsLoadingData(true);

        const userInfoPromise = await getUserInfo();

        setUserInfo({ ...userInfoPromise.data });

        setIsLoadingData(false);
      } else if (!user && !isLoadingData && !isLoadingUser) {
        setUserInfo(null);
      }
    }

    fetch();

  }, [user, isLoadingUser]);

  useEffect(() => {
    const getAllProvinces = async () => {
      const allProvinces: ProvinceType[] = (await axios.get('https://provinces.open-api.vn/api/p/')).data;
      
      allProvinces.forEach(pro => {
        if (pro.name.includes('Tỉnh')) {
          pro.name = formatVN(pro.name.substring(5));
        }
        if (pro.name.includes('Thành phố')) {
          pro.name = formatVN(pro.name.substring(10));
        }
      });

      allProvinces.sort((a: ProvinceType, b: ProvinceType) => {
        return a.name.localeCompare(b.name);
      });     

      setProvinces(allProvinces);
    }

    getAllProvinces();
  }, []);

  useEffect(() => {
    const getAllDistricts = async () => {
      const allDistricts: DisctrictType[] = (await axios.get('https://provinces.open-api.vn/api/d/')).data;

      allDistricts.forEach(district => {
        if (district.name.toLowerCase().includes('quận')) {
          district.name = formatVN(district.name.substring(5));
        }

        if (district.name.toLowerCase().includes('huyện')) {
          district.name = formatVN(district.name.substring(6));
        }

        if (district.name.toLowerCase().includes('thị xã')) {
          district.name = formatVN(district.name.substring(7));
        }

        if (district.name.toLowerCase().includes('thành phố')) {
          district.name = formatVN(district.name.substring(10));
        }

      });

      allDistricts.sort((a: DisctrictType, b: DisctrictType) => {
        return a.name.localeCompare(b.name);
      });

      setDistricts(allDistricts);
    }
    getAllDistricts();
  }, []);


  useEffect(() => {
    const getAllWards = async () => {
      const allWards: WardType[] = (await axios.get('https://provinces.open-api.vn/api/w/')).data;

      allWards.forEach(ward => {
        if (ward.name.toLowerCase().includes('xã')) {
          ward.name = formatVN(ward.name.substring(3));
        }

        if (ward.name.toLowerCase().includes('phường')) {
          ward.name = formatVN(ward.name.substring(7));
        }

        if (ward.name.toLowerCase().includes('thị trấn')) {
          ward.name = formatVN(ward.name.substring(9));
        }
      });

      allWards.sort((a: WardType, b: WardType) => {
        return a.name.localeCompare(b.name);
      });

      setWards(allWards);
      
    }

    getAllWards();
  }, []);

  const value = { accessToken, user, userInfo, isLoading: isLoadingData };

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider');
  }

  return context;
};