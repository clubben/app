import { Stack, styled, GetProps } from '@tamagui/core';

export const YStack = styled(Stack, {
  flexDirection: 'column',
});
export type YStackProps = GetProps<typeof YStack>;

export const XStack = styled(Stack, {
  flexDirection: 'row',
});
export type XStackProps = GetProps<typeof XStack>;

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

export type ZStackProps = GetProps<typeof ZStack>;
