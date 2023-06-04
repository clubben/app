module.exports = {
  expo: {
    name: 'party-app',
    scheme: 'clubben',
    slug: 'party-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    plugins: [
      'expo-apple-authentication',
      [
        'expo-router',
        {
          origin: 'https://clubben.app',
        },
      ],
      [
        'expo-build-properties',
        {
          ios: {
            deploymentTarget: '13.0',
          },
        },
      ],
    ],
    ios: {
      bundleIdentifier: 'com.jonashiltl.clubben',
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.jonashiltl.clubben',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      BASE_URL: 'http://192.168.0.101:4000',
      ANDROID_FIREBASE_CLIENT_ID: process.env.ANDROID_FIREBASE_CLIENT_ID,
      IOS_FIREBASE_CLIENT_ID: process.env.IOS_FIREBASE_CLIENT_ID,
      eas: {
        projectId: '095ac817-e915-4693-a787-b93a9c070a3d',
      },
    },
  },
};
