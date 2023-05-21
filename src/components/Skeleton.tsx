import { useTheme } from '@tamagui/core';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export type SkeletonProps = {
  width: number;
  height: number;
  borderRadius: number;
};

export default function Skeleton(props: SkeletonProps) {
  const fadeAnimation = useSharedValue(0.3);
  const theme = useTheme();

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
      <View
        style={{
          backgroundColor: theme.backgroundOverlayPrimary.val,
          width: props.width,
          height: props.height,
          borderRadius: props.borderRadius,
        }}
      />
    </Animated.View>
  );
}
