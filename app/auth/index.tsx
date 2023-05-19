import Link from 'components/Link';
import { YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Auth() {
  return (
    <YStack>
      <Text>Auth</Text>
      <Link href={{ pathname: '/auth/login' }}>Log in</Link>
      <Link href={{ pathname: '/auth/signup' }}>Sign up</Link>
    </YStack>
  );
}
