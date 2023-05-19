import { Text } from 'components/Text';
import { Stack } from 'expo-router';

export default function SignUp() {
  return (
    <>
      <Stack.Screen options={{ title: 'Sign up' }} />
      <Text>Sign up</Text>
    </>
  );
}
