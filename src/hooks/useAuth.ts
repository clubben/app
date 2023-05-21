import { AuthContext } from 'contexts/auth/AuthContext';
import { useContext } from 'react';
import { keyManager } from 'src/data/local/auth/keys';

export function useAuth() {
  const { authState, setSkipped, me, setMe, meIsLoading } =
    useContext(AuthContext);

  const logOut = () => {
    keyManager.deleteAccessToken();
    keyManager.deleteRefreshToken();
    setMe(null);
    setSkipped(false);
  };

  return {
    me,
    meIsLoading,
    authState,
    logOut,
    setSkipped,
  };
}
