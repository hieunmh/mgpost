import { UserInfo } from '@/types/type';
import { User } from '@supabase/auth-helpers-nextjs';
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react';
import { createContext, useContext, useEffect, useState } from 'react';


type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userInfo: UserInfo |null;
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
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const getUserInfo = () => supabase.from('users').select('*').single();

  useEffect(() => {
    if (user && !isLoadingData && !userInfo) {
      setIsLoadingData(true);

      Promise.allSettled([getUserInfo()]).then(res => {
        const userInfoPromise = res[0];

        if (userInfoPromise.status === 'fulfilled') {
          setUserInfo(userInfoPromise.value.data);
        }

        setIsLoadingData(false);
      })
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserInfo(null);
    }
  }, [user, isLoadingUser]);

  const value = { accessToken, user, userInfo, isLoading: isLoadingUser };

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider');
  }

  return context;
};