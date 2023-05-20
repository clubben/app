import { createTokens } from '@tamagui/core';

export const tokens = createTokens({
  size: {
    xs: 20,
    sm: 32,
    md: 40,
    lg: 54,
  },
  space: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
  },
  radius: {
    xs: 4,
    sm: 6,
    md: 10,
    lg: 14,
  },
  color: {
    accentPrimary: 'rgba(255, 142, 120, 0.88)',
    accentSecondary: 'rgba(255, 142, 120, 0.6)',
  },
  zIndex: { 0: 0, 1: 100, 2: 200 },
});
