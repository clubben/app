import { createTokens } from '@tamagui/core';

export const tokens = createTokens({
  size: {
    sm: 38,
    md: 46,
    lg: 60,
  },
  space: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  color: {
    accent: 'rgba(255, 142, 120, 0.88)',
  },
  zIndex: { 0: 0, 1: 100, 2: 200 },
});
