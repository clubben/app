import {
  SizeTokens,
  Stack,
  StackProps,
  createStyledContext,
  setupReactNative,
  styled,
  withStaticProperties,
} from '@tamagui/core';
import { getSize } from '@tamagui/get-token';
import { cloneElement, useContext } from 'react';
import { TextInput } from 'react-native';

import { Text } from './Text';

setupReactNative({
  TextInput,
});

export const InputContext = createStyledContext({
  size: '$md' as SizeTokens,
  multiline: false,
  error: undefined as string | undefined,
});

const InputFrame = styled(Stack, {
  name: 'InputFrame',
  context: InputContext,
  borderWidth: 1,
  borderColor: '$borderSecondary',
  focusable: true,
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',

  // this fixes a flex bug where it overflows container
  minWidth: 0,

  focusStyle: {
    borderColor: '$borderPrimary',
    borderWidth: 1,
  },

  variants: {
    size: {
      '...size': (name, { tokens }) => {
        return {
          height: tokens.size[name],
          borderRadius: tokens.radius[name],
          gap: tokens.space[name].val * 0.5,
          paddingHorizontal: tokens.space[name],
        };
      },
    },

    multiline: {
      true: {
        minHeight: 70,
        maxHeight: 120,
        //height: undefined,
      },
    },

    error: {
      ':string': error => ({
        position: 'relative',
        mb: 18,
      }),
    },
  } as const,

  defaultVariants: {
    size: '$md',
    multiline: false,
    error: undefined,
  },
});

const InputValue = styled(TextInput, {
  name: 'Input',
  context: InputContext,
  f: 1,
  height: '100%',
  fow: '500',
  fontFamily: '$body',
  col: '$textPrimary',
  placeholderTextColor: '$textPlaceholder',
  fontSize: 14,
  jc: 'center',
});

const InputIcon = (props: { children: any }) => {
  const { size } = useContext(InputContext);
  const smaller = getSize(size, {
    shift: -2,
  });

  return cloneElement(props.children, {
    size: smaller.val,
  });
};

const InputButton = (props: {
  children: any;
  onPress?: StackProps['onPress'];
}) => {
  const { size } = useContext(InputContext);
  const smaller = getSize(size, {
    shift: -2,
  });

  return (
    <Stack p={2} onPress={props.onPress} pressStyle={{ opacity: 0.5 }}>
      {cloneElement(props.children, {
        size: smaller.val,
      })}
    </Stack>
  );
};

const InputError = () => {
  const context = useContext(InputContext);
  return (
    <Text variant="caption" col="$textError" position="absolute" b={-18}>
      {context.error}
    </Text>
  );
};
export const Input = withStaticProperties(InputFrame, {
  Props: InputContext.Provider,
  Value: InputValue,
  Icon: InputIcon,
  Button: InputButton,
  Error: InputError,
});
