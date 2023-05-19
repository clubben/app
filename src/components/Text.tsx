import { Text as TText, styled, GetProps } from '@tamagui/core';

export const Text = styled(TText, {
  variants: {
    variant: {
      headline: {
        fow: '700',
        fontFamily: '$heading',
        col: '$textPrimary',
        fontSize: 15,
      },
      link: {
        fow: '500',
        fontFamily: '$body',
        col: '$textLink',
        fontSize: 14,
      },
      body: {
        fow: '500',
        fontFamily: '$body',
        col: '$textPrimary',
        fontSize: 14,
      },
      caption: {
        fow: '300',
        fontFamily: '$body',
        col: '$textSecondary',
        fontSize: 13,
      },
    },
  },

  defaultVariants: {
    variant: 'body',
  },
});

export type TextProps = GetProps<typeof Text>;
