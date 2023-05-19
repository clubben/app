import {
  GetProps,
  SizeTokens,
  Stack,
  Text,
  createStyledContext,
  styled,
  useTheme,
  withStaticProperties,
} from '@tamagui/core';
import { getSize, getSpace } from '@tamagui/get-token';
import { cloneElement, useContext } from 'react';

type ButtonVariants = 'accent' | 'solid' | 'ghost';

export const ButtonContext = createStyledContext({
  size: '$md' as SizeTokens,
  variant: 'solid' as ButtonVariants,
});

export const ButtonFrame = styled(Stack, {
  name: 'Button',
  context: ButtonContext,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',

  variants: {
    variant: {
      accent: {
        backgroundColor: '$accentPrimary',

        pressStyle: {
          backgroundColor: '$accentSecondary',
          scale: 0.98,
        },
      },
      solid: {
        backgroundColor: '$backgroundOverlaySecondary',

        pressStyle: {
          backgroundColor: '$backgroundOverlayPrimary',
          scale: 0.98,
        },
      },
      ghost: {
        backgroundColor: 'transparent',

        pressStyle: {
          backgroundColor: '$backgroundOverlaySecondary',
          scale: 0.98,
        },
      },
    },
    size: {
      '...size': (name, { tokens }) => {
        return {
          height: tokens.size[name],
          borderRadius: tokens.radius[name],
          gap: tokens.space[name].val * 0.4,
          paddingHorizontal: getSpace(name, {
            shift: -1,
          }),
        };
      },
    },
  } as const,
});

type ButtonProps = GetProps<typeof ButtonFrame>;

export const ButtonText = styled(Text, {
  name: 'ButtonText',
  context: ButtonContext,
  fontWeight: '500',
  fontSize: '$3',
  userSelect: 'none',

  variants: {
    variant: {
      accent: {
        color: '$textAlwaysWhite',
      },
      solid: {
        color: '$textPrimary',
      },
      ghost: {
        color: '$textPrimary',
      },
    },
  } as const,
});

const ButtonIcon = (props: { children: any }) => {
  const { size } = useContext(ButtonContext);
  const smaller = getSize(size, {
    shift: -2,
  });
  const theme = useTheme();

  return cloneElement(props.children, {
    size: smaller.val * 0.5,
    color: theme.iconPrimary.get(),
  });
};

export const Button = withStaticProperties(ButtonFrame, {
  Props: ButtonContext.Provider,
  Text: ButtonText,
  Icon: ButtonIcon,
});
