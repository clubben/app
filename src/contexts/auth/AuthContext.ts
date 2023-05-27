import { Account } from '@buf/jonas_clubben.bufbuild_es/auth/v1/auth_pb';
import React from 'react';

export type AuthState = 'authenticated' | 'unauthenticated' | 'skipped';
type TAuthContext = {
  skipped: boolean;
  setSkipped: (s: boolean) => void;
  me: Account | null;
  setMe: (a: Account | null) => void;
  meIsLoading: boolean;
  authState: AuthState;
};

export const AuthContext = React.createContext<TAuthContext>({
  skipped: false,
  setSkipped: (_: boolean) => {
    console.error('No AuthContext Provider found');
  },
  me: null,
  setMe: (_: Account) => {
    console.error('No AuthContext Provider found');
  },
  meIsLoading: false,
  authState: 'skipped',
});
