import { createFont } from '@tamagui/core';

export const interFont = createFont({
  family: 'Inter_500Medium',
  // keys used for the objects you pass to `size`, `lineHeight`, `weight`
  // and `letterSpacing` should be consistent. The `createFont` function
  // will fill-in any missing values if `lineHeight`, `weight` or `letterSpacing`
  // are subsets of `size`
  size: {
    1: 12,
    2: 14,
    3: 15,
  },
  lineHeight: {
    // 1 will be 22
    2: 22,
  },
  weight: {
    1: '300',
    // 2 will be 300
    3: '600',
  },
  letterSpacing: {
    1: -0.08,
    2: -0.24,
    3: 0.48,
  },
  // (native) swap out fonts by face/style
  face: {
    300: { normal: 'Inter_300Light' },
    500: { normal: 'Inter_500Medium' },
    600: { normal: 'Inter_600SemiBold' },
  },
});
