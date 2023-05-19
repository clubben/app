import { YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import Head from 'expo-router/head';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Account() {
  const { top } = useSafeAreaInsets();
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <YStack mt={top}>
        <Text>Account</Text>
      </YStack>
    </>
  );
}
