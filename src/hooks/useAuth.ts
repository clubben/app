import { SignUpRequest } from '@buf/jonas_clubben.bufbuild_es/auth/v1/auth_pb';
import { ConnectError } from '@bufbuild/connect';
import { PartialMessage } from '@bufbuild/protobuf';
import { AuthContext } from 'contexts/auth/AuthContext';
import { authClient } from 'data/apis/clients';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Env } from 'src/Env';
import { keyManager } from 'src/data/local/auth/keys';

import { useToast } from './useToast';

export function useAuth() {
  const { authState, setSkipped, me, setMe, meIsLoading } =
    useContext(AuthContext);
  const navigation = useNavigation();
  const router = useRouter();
  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: Env.ANDROID_FIREBASE_CLIENT_ID,
    iosClientId: Env.IOS_OAUTH_CLIENT_ID,
  });
  const { errorToast } = useToast();
  const [signInLoading, setSignInLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);

  async function appleSignIn() {
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
  }

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
            tokens.accessTokenExpiration?.toDate()
          );
          keyManager.setRefreshToken(tokens.refreshToken);
        }
        setSignInLoading(false);
        closeModal();
      };

      clubbenSignIn(response.authentication.idToken);
    } else if (response) {
      setSignInLoading(false);
    }
  }, [response]);

  async function googleSignIn() {
    setSignInLoading(true);
    await promptAsync();
  }

  async function logOut() {
    keyManager.deleteAccessToken();
    keyManager.deleteRefreshToken();
    setMe(null);
    setSkipped(false);
  }

  async function signIn(email: string, password: string) {
    setSignInLoading(true);
    try {
      const res = await authClient.signIn({
        email,
        password,
      });
      if (res.tokens) {
        keyManager.setAccessToken(
          res.tokens.accessToken,
          res.tokens.accessTokenExpiration?.toDate()
        );
        keyManager.setRefreshToken(res.tokens.refreshToken);
      }
      if (res.account) {
        setMe(res.account);
      }

      closeModal();
    } catch (error) {
      if (error instanceof ConnectError) {
        errorToast({
          title: error.rawMessage,
        });
      }
    }

    setSignInLoading(false);
  }

  async function signUp(req: PartialMessage<SignUpRequest>) {
    setSignUpLoading(true);
    try {
      const res = await authClient.signUp(req);
      if (res.tokens) {
        keyManager.setAccessToken(
          res.tokens.accessToken,
          res.tokens.accessTokenExpiration?.toDate()
        );
        keyManager.setRefreshToken(res.tokens.refreshToken);
      }
      if (res.account) {
        setMe(res.account);
      }
      closeModal();
    } catch (error) {
      if (error instanceof ConnectError) {
        errorToast({
          title: error.rawMessage,
        });
      }
    }

    setSignUpLoading(false);
  }

  function closeModal() {
    if (navigation.getParent()?.canGoBack()) {
      navigation.getParent()?.goBack();
    } else {
      router.replace('/index');
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
    signUp,
    signUpLoading,
  };
}
