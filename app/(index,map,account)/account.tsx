import { Profile } from '@buf/jonas_clubben.bufbuild_es/profile/v1/profile_pb';
import { Settings } from '@tamagui/lucide-icons';
import { Button } from 'components/Button';
import ProfileDisplay from 'components/ProfileDisplay';
import { ScrollView } from 'components/ScrollView';
import { Separator } from 'components/Separator';
import { XStack } from 'components/Stacks';
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
      <XStack p="$sm" px="$md" pt={top} jc="space-between">
        <ProfileDisplay
          size="$sm"
          profile={
            new Profile({
              id: '1r1o2',
              name: 'Jonas Hiltl',
              username: 'jonas.hiltl',
            })
          }
        />
        <Button variant="ghost">
          <Button.Icon>
            <Settings />
          </Button.Icon>
        </Button>
      </XStack>
      <Separator />
      <ScrollView p="$md">
        <Text>Test</Text>
      </ScrollView>
    </>
  );
}
