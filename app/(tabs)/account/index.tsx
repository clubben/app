import { useTheme } from '@tamagui/core';
import { Settings } from '@tamagui/lucide-icons';
import { Button } from 'components/Button';
import FriendList from 'components/FriendList';
import ProfileDisplay from 'components/ProfileDisplay';
import { ScrollView } from 'components/ScrollView';
import { YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { i18n } from 'hooks/i18n';
import { useAuth } from 'hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Account() {
  const theme = useTheme();
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

      <Stack.Screen
        options={{
          headerTitle: i18n.t('account.title'),
          headerStyle: {
            backgroundColor: theme.backgroundPrimary.val,
          },
          headerRight: () => (
            <Button variant="ghost">
              <Button.Icon>
                <Settings />
              </Button.Icon>
            </Button>
          ),
        }}
      />

      <ScrollView space="$md" pt="$md">
        <ProfileDisplay mx="$md" size="$md" profile={me.profile} />
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
