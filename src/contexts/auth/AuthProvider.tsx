import { Account } from '@buf/jonas_clubben.bufbuild_es/auth/v1/auth_pb';
import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from 'data/apis/clients';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { globalMMKV } from 'src/data/local/client';

import { AuthContext, AuthState } from './AuthContext';

const SKIP_KEY = 'has_skipped';
const ME_QUERY_KEY: QueryKey = ['me'];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [skipped, setSkippedState] = useState(
    globalMMKV.getBoolean(SKIP_KEY) ?? false
  );
  const { data: me, isLoading: meIsLoading } = useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: authClient.me,
    initialData: null,
  });

  function setSkipped(value: boolean) {
    globalMMKV.set(SKIP_KEY, value);
    setSkippedState(value);
  }

  function setMe(a: Account | null) {
    queryClient.setQueryData(ME_QUERY_KEY, a);
  }

  const authState: AuthState = me?.emailVerified
    ? 'authenticated'
    : skipped
    ? 'skipped'
    : 'unauthenticated';

  useEffect(() => {
    if (authState === 'unauthenticated' && !meIsLoading) {
      router.push('/auth');
    }
  }, [authState, meIsLoading]);

  return (
    <AuthContext.Provider
      value={{
        setSkipped,
        skipped,
        me,
        setMe,
        meIsLoading,
        authState,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
