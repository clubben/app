import { AuthContext } from 'contexts/auth/AuthContext';
import { authClient } from 'data/apis/clients';
import dayjs from 'dayjs';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import { useContext, useEffect, useState } from 'react';
import { Env } from 'src/Env';
import { keyManager } from 'src/data/local/auth/keys';

export function useAuth() {
  const { authState, setSkipped, me, setMe, meIsLoading } =
    useContext(AuthContext);
  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: Env.ANDROID_FIREBASE_CLIENT_ID,
    iosClientId: Env.IOS_FIREBASE_CLIENT_ID,
  });
  const [signInLoading, setSignInLoading] = useState(false);

  const appleSignIn = async () => {
    try {
      setSignInLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential.identityToken) {
        // TODO call backend
        console.log(credential.identityToken);
      }
    } catch (e) {
      console.log(e);
    }
    setSignInLoading(false);
  };

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.idToken) {
      const clubbenSignIn = async (googleIdToken: string) => {
        const { account, tokens } = await authClient.googleSignIn({
          idToken: googleIdToken,
        });

        if (account) {
          setMe(account);
        }
        if (tokens) {
          keyManager.setAccessToken(
            tokens.accessToken,
            tokens.accessTokenExpiration
              ? dayjs(tokens.accessTokenExpiration?.toDate()).unix()
              : undefined
          );
          keyManager.setRefreshToken(tokens.refreshToken);
        }
        setSignInLoading(false);
      };

      clubbenSignIn(response.authentication?.idToken);
    } else if (response) {
      setSignInLoading(false);
    }
  }, [response]);

  const googleSignIn = async () => {
    setSignInLoading(true);
    await promptAsync();
  };

  const logOut = () => {
    keyManager.deleteAccessToken();
    keyManager.deleteRefreshToken();
    setMe(null);
    setSkipped(false);
  };

  async function signIn(email: string, password: string) {
    const res = await authClient.signIn({
      email,
      password,
    });
    if (res.tokens) {
      keyManager.setAccessToken(
        res.tokens.accessToken,
        res.tokens.accessTokenExpiration
          ? dayjs(res.tokens.accessTokenExpiration?.toDate()).unix()
          : undefined
      );
      keyManager.setRefreshToken(res.tokens.refreshToken);
    }
    if (res.account) {
      setMe(res.account);
    }
  }

  return {
    me,
    meIsLoading,
    authState,
    logOut,
    setSkipped,
    signIn,
    googleSignIn,
    appleSignIn,
    signInLoading,
  };
}
