process.env.TAMAGUI_TARGET = 'native';

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            // This needs to be mirrored in tsconfig.json
            src: ['./src'],
            components: ['./src/components'],
            contexts: ['./src/contexts'],
            data: ['./src/data'],
            hooks: ['./src/hooks'],
            styles: ['./src/styles'],
            utils: ['./src/utils'],
          },
        },
      ],
      [
        'transform-inline-environment-variables',
        {
          include: ['TAMAGUI_TARGET'],
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['@tamagui/core'],
          config: './tamagui.config.ts',
          logTimings: true,
        },
      ],
      require.resolve('expo-router/babel'),
      'react-native-reanimated/plugin',
    ],
  };
};
