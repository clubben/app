import { Stack, StackProps } from '@tamagui/core';
import * as React from 'react';
import { ColorValue } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, { Circle, NumberProp } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const radius = 45;
const circumference = radius * Math.PI * 2;

type CircularProgressProps = StackProps & {
  percent: SharedValue<number>;
  strokeBackgroundColor: ColorValue;
  strokeBackgroundOpacity?: number;
  strokeColor: ColorValue;
  strokeWidth?: NumberProp;
};

export default function CircularProgress(props: CircularProgressProps) {
  const {
    percent,
    strokeBackgroundColor,
    strokeBackgroundOpacity,
    strokeColor,
    strokeWidth = 10,
    ...rest
  } = props;

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - percent.value),
  }));

  return (
    <Stack {...rest}>
      <Svg viewBox="0 0 100 100" transform={[{ rotateZ: '-90deg' }]}>
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke={strokeBackgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={strokeBackgroundOpacity}
        />
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx="50"
          cy="50"
          r="45"
          strokeWidth={strokeWidth}
          strokeDasharray={`${radius * Math.PI * 2}`}
          stroke={strokeColor}
          strokeLinecap="round"
          fill="transparent"
        />
      </Svg>
    </Stack>
  );
}
