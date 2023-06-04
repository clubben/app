import { AuthService } from '@buf/jonas_clubben.bufbuild_connect-es/auth/v1/auth_connect';
import { Interceptor, createPromiseClient } from '@bufbuild/connect';
import { keyManager } from 'data/local/auth/keys';
import dayjs from 'dayjs';
import { Env } from 'src/Env';

import { createXHRGrpcWebTransport } from './custom_transport';

const transportWithoutInterceptor = createXHRGrpcWebTransport({
  baseUrl: Env.BASE_URL,
});

const client = createPromiseClient(AuthService, transportWithoutInterceptor);

export const authInterceptor: Interceptor = next => async req => {
  let accessToken = keyManager.getAccessToken();

  if (
    !accessToken ||
    (accessToken &&
      dayjs
        .unix(accessToken.expiresAt)
        .utc()
        .subtract(10, 'minute')
        .isBefore(dayjs.utc()))
  ) {
    const refreshToken = keyManager.getRefreshToken();
    if (refreshToken) {
      accessToken = await refreshAccessToken(refreshToken);
      console.log('refreshed access token');
    }
  }

  if (accessToken) {
    req.header.set('Authorization', `Bearer ${accessToken?.token}`);
  }

  return await next(req);
};

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const res = await client.refreshAccessToken({
      refreshToken,
    });

    keyManager.setAccessToken(
      res.accessToken,
      res.accessTokenExpiration?.toDate()
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return keyManager.getAccessToken()!;
  } catch (_) {}
};
