import { Stack, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { Text } from 'react-native';

export default function Profile() {
  const { profile } = useLocalSearchParams<{ profile: string }>();

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Text>{profile}</Text>
    </>
  );
}
