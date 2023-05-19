import { Text } from 'components/Text';
import { Stack } from 'expo-router';

export default function LogIn() {
  return (
    <>
      <Stack.Screen options={{ title: 'Log in' }} />
      <Text>Log in</Text>
    </>
  );
}
