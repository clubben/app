import {
  SizeTokens,
  Stack,
  createStyledContext,
  styled,
  withStaticProperties,
} from '@tamagui/core';
import { Pencil } from '@tamagui/lucide-icons';
import { Image, ImageProps } from 'expo-image';
import { useContext } from 'react';

const AvatarContext = createStyledContext({
  size: '$md' as SizeTokens,
});

const AvatarFrame = styled(Stack, {
  name: 'Avatar',
  context: AvatarContext,
  position: 'relative',
  bc: '$backgroundOverlayPrimary',
  aspectRatio: 1,

  variants: {
    size: {
      $sm: {
        width: 50,
        borderRadius: '$sm',
      },
      $md: {
        width: 70,
        borderRadius: '$md',
      },
      $lg: {
        width: 90,
        borderRadius: '$lg',
      },
    },
  } as const,

  defaultVariants: {
    size: '$md',
  },
});

const AvatarEdit = () => {
  return (
    <Stack
      position="absolute"
      bottom={-5}
      right={-5}
      zIndex={100}
      bc="$accentPrimary"
      p="$sm"
      borderRadius={100}>
      <Pencil color="$textAlwaysWhite" size={15} />
    </Stack>
  );
};

const AvatarImage = (props: { source: ImageProps['source'] }) => {
  const { size } = useContext(AvatarContext);

  return (
    <Stack borderRadius={size} overflow="hidden">
      <Image
        source={props.source}
        contentFit="cover"
        contentPosition="center"
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </Stack>
  );
};

export const Avatar = withStaticProperties(AvatarFrame, {
  Props: AvatarContext.Provider,
  Edit: AvatarEdit,
  Image: AvatarImage,
});
