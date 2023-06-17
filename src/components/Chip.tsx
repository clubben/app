import {
  createStyledContext,
  styled,
  withStaticProperties,
} from '@tamagui/core';

import { ButtonFrame, ButtonText } from './Button';

export const ChipContext = createStyledContext({
  isHighlighted: false,
});

export const ChipFrame = styled(ButtonFrame, {
  name: 'Chip',
  context: ChipContext,
  br: 200,
  space: '$md',

  height: 38,

  pressStyle: {
    opacity: 0.7,
  },

  variants: {
    isHighlighted: {
      true: {
        bc: '$backgroundAccent',
      },
      false: {
        bc: '$backgroundAccentSecondary',
      },
    },
  } as const,

  defaultVariants: {
    isHighlighted: false,
  },
});

export const ChipText = styled(ButtonText, {
  name: 'ButtonText',
  context: ChipContext,

  variants: {
    isHighlighted: {
      true: {
        color: 'white',
      },
      false: {
        color: '$textPrimary',
      },
    },
  },

  defaultVariants: {
    isHighlighted: false,
  },
});

export const Chip = withStaticProperties(ChipFrame, {
  Props: ChipContext.Provider,
  Text: ChipText,
});
