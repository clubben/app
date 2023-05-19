import Link from 'components/Link';
import { YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const { top } = useSafeAreaInsets();

  return (
    <YStack mt={top}>
      <Text>Home</Text>
      <Link href={{ pathname: '/auth' }}>Auth</Link>
    </YStack>
  );
}
