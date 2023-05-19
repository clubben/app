import { createTamagui } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';

import { interFont } from './font';
import { light, dark } from './theme';
import { tokens } from './tokens';

export const config = createTamagui({
  themes: {
    light,
    dark,
  },
  tokens,
  shorthands,
  fonts: {
    // for tamagui, heading and body are assumed
    heading: interFont,
    body: interFont,
  },
});
