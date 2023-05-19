import { Stack, styled } from '@tamagui/core';

export const YStack = styled(Stack, {
  flexDirection: 'column',
});

export const XStack = styled(Stack, {
  flexDirection: 'row',
});

export const ZStack = styled(
  YStack,
  {
    position: 'relative',
  },
  {
    neverFlatten: true,
    isZStack: true,
  }
);
