import Constants from 'expo-constants';

function getExpoExtra(key: string) {
  if (Constants.expoConfig?.extra) {
    const BASE_URL = Constants.expoConfig.extra[key];

    if (!BASE_URL) {
      throw new Error(`${key} is missing.`);
    }

    return BASE_URL;
  } else {
    throw new Error('Expo extra constants are missing.');
  }
}

function getEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is missing in proccess.env.`);
  }
  return value;
}

export const Env = {
  BASE_URL: getExpoExtra('BASE_URL') as string,
  ANDROID_FIREBASE_CLIENT_ID: getExpoExtra(
    'ANDROID_FIREBASE_CLIENT_ID'
  ) as string,
  IOS_OAUTH_CLIENT_ID: getEnv('EXPO_PUBLIC_IOS_OAUTH_CLIENT_ID'),
};
