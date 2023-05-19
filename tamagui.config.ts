import { config } from 'src/styles/config/tamagui.config';

export type Conf = typeof config;

declare module '@tamagui/core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
