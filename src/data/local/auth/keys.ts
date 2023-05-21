import { ONE_HOUR_IN_SECONDS } from 'utils/constants';

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

  setAccessToken(token: string, expiresIn?: number | string) {
    const expiresInNum =
      typeof expiresIn === 'string' ? parseInt(expiresIn, 10) : expiresIn;
    const expiresAt = Date.now() + (expiresInNum ?? ONE_HOUR_IN_SECONDS) * 1000;

    const accessToken: AccessToken = {
      expiresAt,
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
