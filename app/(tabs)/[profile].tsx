import { Stack } from '@tamagui/core';
import { Stack as ExpoStack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Profile() {
  const { profile } = useLocalSearchParams<{ profile: string }>();
  const { top } = useSafeAreaInsets();

  return (
    <>
      <ExpoStack.Screen options={{ title: 'Profile' }} />
      <Stack mt={top}>
        <Text>Profile Page</Text>
        <Text>{profile}</Text>
      </Stack>
    </>
  );
}
