import {
  RadiusTokens,
  Stack,
  ThemeValueFallback,
  useTheme,
} from '@tamagui/core';
import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: ThemeValueFallback | RadiusTokens;
};

export default function Skeleton(props: SkeletonProps) {
  const fadeAnimation = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnimation.value,
    };
  });

  useEffect(() => {
    fadeAnimation.value = withRepeat(
      withTiming(1, {
        duration: 800,
        easing: Easing.linear,
      }),
      -1, // -1 means an infinite loop
      true // reverse the animation on each repeat
    );
  }, []);

  return (
    <Animated.View style={animatedStyle}>
      <Stack
        bc="$backgroundOverlayPrimary"
        width={props.width}
        height={props.height}
        borderRadius={props.borderRadius}
      />
    </Animated.View>
  );
}
