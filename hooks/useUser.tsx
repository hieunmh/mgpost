import { UserInfoType } from '@/types/type';
import { User } from '@supabase/auth-helpers-nextjs';
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react';
import { createContext, useContext, useEffect, useState } from 'react';


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