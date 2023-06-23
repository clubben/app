import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="camera"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
      />
    </Stack>
  );
}
