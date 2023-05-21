import { AuthService } from '@buf/jonas_clubben.bufbuild_connect-es/auth/v1/auth_connect';
import { Interceptor, createPromiseClient } from '@bufbuild/connect';
import { createConnectTransport } from '@bufbuild/connect-web';
import dayjs from 'dayjs';
import { Env } from 'src/Env';
import { FIVE_MINUTES_IN_MILLISECONDS } from 'utils/constants';

import { keyManager } from '../local/auth/keys';

const transportWithoutInterceptor = createConnectTransport({
  baseUrl: Env.BASE_URL,
});

const client = createPromiseClient(AuthService, transportWithoutInterceptor);

export const authInterceptor: Interceptor = next => async req => {
  let accessToken = keyManager.getAccessToken();
  if (accessToken) {
    console.log('Got stored accessToken');
  }

  if (
    !accessToken ||
    (accessToken &&
      Date.now() > accessToken.expiresAt - FIVE_MINUTES_IN_MILLISECONDS)
  ) {
    const refreshToken = keyManager.getRefreshToken();
    if (refreshToken) {
      accessToken = await refreshAccessToken(refreshToken);
      console.log('refreshed access token');
    }
  }

  req.header.append('Authorization', `Bearer ${accessToken}`);

  return await next(req);
};

const refreshAccessToken = async (refreshToken: string) => {
  const res = await client.refreshAccessToken({
    refreshToken,
  });

  const unix = res.accessTokenExpiration
    ? dayjs(res.accessTokenExpiration.toDate()).unix()
    : undefined;

  keyManager.setAccessToken(res.accessToken, unix);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return keyManager.getAccessToken()!;
};
