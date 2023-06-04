import { Settings } from '@tamagui/lucide-icons';
import { Button } from 'components/Button';
import FriendList from 'components/FriendList';
import ProfileDisplay from 'components/ProfileDisplay';
import { ScrollView } from 'components/ScrollView';
import { Separator } from 'components/Separator';
import { XStack, YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import Head from 'expo-router/head';
import { i18n } from 'hooks/i18n';
import { useAuth } from 'hooks/useAuth';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function Account() {
  const { top } = useSafeAreaInsets();
  const { me } = useAuth();

  if (!me) {
    return (
      <SafeAreaView>
        <Text>Not logged in</Text>
      </SafeAreaView>
    );
  }

  if (!me.profile) {
    return (
      <SafeAreaView>
        <Text>No Profile</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>

      <ScrollView space="$md" stickyHeaderIndices={[0]}>
        <YStack pt={top} space="$md" bc="$backgroundPrimary">
          <XStack mx="$m" jc="space-between" ai="center">
            <ProfileDisplay size="$sm" profile={me.profile} />
            <Button variant="ghost">
              <Button.Icon>
                <Settings />
              </Button.Icon>
            </Button>
          </XStack>
          <Separator />
        </YStack>
        <YStack ml="$m">
          <Text px="$md" variant="h2">
            {i18n.t('account.friends')}
          </Text>
          <FriendList userId={me.id} />
        </YStack>
      </ScrollView>
    </>
  );
}
