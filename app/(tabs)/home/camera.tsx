import { Stack, StackProps, Theme, View, getTokens } from '@tamagui/core';
import { SwitchCamera, Zap, ZapOff, X } from '@tamagui/lucide-icons';
import { Button } from 'components/Button';
import CircularProgress from 'components/CircularProgress';
import { YStack } from 'components/Stacks';
import { globalMMKV } from 'data/local/client';
import { BlurView } from 'expo-blur';
import { Camera as ExpoCamera, CameraType, FlashMode } from 'expo-camera';
import { Stack as ExpoStack, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CAMERA_TYPE_KEY = 'CAMERA_TYPE';
const saveCameraType = (type: CameraType) => {
  globalMMKV.set(CAMERA_TYPE_KEY, type);
};

const getCameraType = (): CameraType | null => {
  const type = globalMMKV.getString(CAMERA_TYPE_KEY);
  if (type === CameraType.back || type === CameraType.front) {
    return type;
  } else {
    return null;
  }
};

const START_ZOOM = 0;
const SCALE_FULL_ZOOM = 3;
const MIN_ZOOM = 0;
const MAX_ZOOM = 1;

export default function Camera() {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
  const [cameraType, setCameraType] = useState(
    getCameraType() ?? CameraType.front
  );
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [zoom, setZoom] = useState(START_ZOOM);
  const playPercent = useSharedValue(0);

  function toggleCameraType() {
    setCameraType(prev => {
      const next =
        prev === CameraType.back ? CameraType.front : CameraType.back;
      saveCameraType(next);
      return next;
    });
  }

  function toggleFlashMode() {
    setFlashMode(prev =>
      prev === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  function startRecording() {
    setIsRecording(prev => {
      const newIsRecording = !prev;
      if (newIsRecording) {
        playPercent.value = withTiming(1, {
          duration: 10 * 1000,
          easing: Easing.linear,
        });
      } else {
        playPercent.value = 0;
      }
      return newIsRecording;
    });
  }

  const pinchGesture = useMemo(
    () =>
      Gesture.Pinch()
        .onUpdate(event => {
          const startZoom = zoom;

          const scale = interpolate(
            event.scale,
            [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
            [-1, 0, 1],
            Extrapolate.CLAMP
          );

          const value = interpolate(
            scale,
            [-1, 0, 1],
            [MIN_ZOOM, startZoom, MAX_ZOOM],
            Extrapolate.CLAMP
          );
          setZoom(value);
          console.log(
            'Event Scale: ' +
              event.scale.toString() +
              'Scale: ' +
              scale.toString() +
              ' Zoom: ' +
              zoom.toString()
          );
        })
        .runOnJS(true),
    [zoom]
  );

  if (!permission?.granted) {
    requestPermission();
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  return (
    <>
      <ExpoStack.Screen options={{ headerShown: false }} />

      <Theme name="light">
        <Stack position="relative" f={1}>
          <GestureDetector gesture={pinchGesture}>
            <ExpoCamera
              style={{ flex: 1 }}
              flashMode={flashMode}
              type={cameraType}
              zoom={zoom}
            />
          </GestureDetector>
          <YStack
            pos="absolute"
            top={top}
            bottom={bottom}
            right={0}
            mx="$md"
            space="$md">
            <Button
              aspectRatio={1}
              onPress={() => {
                router.back();
              }}>
              <Button.Icon>
                <X color="white" />
              </Button.Icon>
            </Button>
            <Stack height={40} />

            <Button aspectRatio={1} onPress={toggleFlashMode}>
              <Button.Icon>
                {flashMode === FlashMode.off ? (
                  <Zap color="white" />
                ) : (
                  <ZapOff color="white" />
                )}
              </Button.Icon>
            </Button>
            <Button aspectRatio={1} onPress={toggleCameraType}>
              <Button.Icon>
                <SwitchCamera color="white" />
              </Button.Icon>
            </Button>
          </YStack>
          <PlayButton
            percent={playPercent}
            isRecording={isRecording}
            position="absolute"
            bottom={bottom}
            als="center"
            onPress={startRecording}
          />
        </Stack>
      </Theme>
    </>
  );
}

type PlayButtonProps = StackProps & {
  isRecording: boolean;
  percent: SharedValue<number>;
};
const PlayButton = (props: PlayButtonProps) => {
  const { isRecording, ...rest } = props;
  const tokens = getTokens();

  const indicatorHeight = 28;
  const circleHeight = indicatorHeight * 2.8;
  const br = circleHeight / 2;
  const borderWidth = tokens.radius.sm.val;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withSpring(
        isRecording ? indicatorHeight / 4 : indicatorHeight / 2
      ),
      transform: [{ scale: withSpring(isRecording ? 1.2 : 1) }],
    };
  });

  return (
    <Stack
      pos="relative"
      jc="center"
      ai="center"
      height={circleHeight}
      aspectRatio={1}
      {...rest}>
      <CircularProgress
        percent={props.percent}
        pos="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        strokeColor="white"
        strokeBackgroundColor="white"
        strokeBackgroundOpacity={0.3}
        strokeWidth={borderWidth}
        zIndex={100}
      />
      <BlurView
        intensity={10}
        tint="light"
        style={{
          height: circleHeight - borderWidth * 2,
          aspectRatio: 1,
          position: 'absolute',
          borderRadius: br,
          overflow: 'hidden',
        }}
      />
      <Animated.View
        style={[
          {
            backgroundColor: 'red',
            height: indicatorHeight,
            aspectRatio: 1,
          },
          animatedStyle,
        ]}
      />
    </Stack>
  );
};
