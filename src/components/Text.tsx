import { Text as TText, styled } from '@tamagui/core';

export const Text = styled(TText, {
  variants: {
    variant: {
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
        fontSize: 12,
      },
    },
  },

  defaultVariants: {
    variant: 'body',
  },
});
