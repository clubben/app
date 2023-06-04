import dayjs from 'dayjs';
import { ONE_HOUR_IN_MILLISECONDS } from 'utils/constants';

import { globalMMKV } from '../client';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

type AccessToken = {
  expiresAt: number;
  token: string;
};

class KeyManager {
  private accessToken?: AccessToken;
  private refreshToken?: string;

  constructor(private readonly storage = globalMMKV) {
    this.refreshToken = this.storage.getString(REFRESH_TOKEN_KEY);

    const accessTokenStr = this.storage.getString(ACCESS_TOKEN_KEY);
    if (accessTokenStr) {
      this.accessToken = JSON.parse(accessTokenStr);
    }
  }

  setAccessToken(token: string, expiresIn?: number | string | Date) {
    const unix =
      typeof expiresIn === 'number'
        ? expiresIn === undefined
          ? dayjs.utc(Date.now() + ONE_HOUR_IN_MILLISECONDS).unix()
          : expiresIn
        : dayjs.utc(expiresIn).unix();

    const accessToken: AccessToken = {
      expiresAt: unix,
      token,
    };
    this.storage.set(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
    this.accessToken = accessToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  deleteAccessToken() {
    this.accessToken = undefined;
    this.storage.delete(ACCESS_TOKEN_KEY);
  }

  setRefreshToken(token: string) {
    this.storage.set(REFRESH_TOKEN_KEY, token);
    this.refreshToken = token;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  deleteRefreshToken() {
    this.refreshToken = undefined;
    this.storage.delete(REFRESH_TOKEN_KEY);
  }
}

export const keyManager = new KeyManager();
