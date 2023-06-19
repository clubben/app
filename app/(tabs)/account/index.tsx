import { GetPartiesByHosterResponse } from '@buf/jonas_clubben.bufbuild_es/party/v1/party_pb';
import { FlashList } from '@shopify/flash-list';
import { getTokens, useTheme } from '@tamagui/core';
import { Settings } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'components/Button';
import FriendList from 'components/FriendList';
import PartyCard from 'components/PartyCard';
import ProfileDisplay from 'components/ProfileDisplay';
import { ScrollView } from 'components/ScrollView';
import Skeleton from 'components/Skeleton';
import { XStack, YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { partyClient } from 'data/apis/clients';
import { Stack as ExpoStack } from 'expo-router';
import Head from 'expo-router/head';
import { i18n } from 'hooks/i18n';
import { useAuth } from 'hooks/useAuth';
import { useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Account() {
  const { width } = useWindowDimensions();
  const tokens = getTokens();
  const theme = useTheme();
  const { me } = useAuth();

  const { data: parties, isLoading: partiesLoading } = useQuery({
    queryKey: ['partiesByHoster'],
    queryFn: () =>
      me?.id
        ? partyClient.getPartiesByUser({ hosterID: me.id })
        : new GetPartiesByHosterResponse(),
  });

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

      <ExpoStack.Screen
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
        <YStack>
          <Text mx="$md" variant="h2">
            {i18n.t('account.friends')}
          </Text>
          <FriendList userId={me.id} />
        </YStack>
        <YStack>
          <Text mx="$md" variant="h2">
            {i18n.t('parties')}
          </Text>
          {partiesLoading ? (
            <XStack ml="$md" space="$md">
              <Skeleton borderRadius="$md" height={400} width={width * 0.6} />
              <Skeleton borderRadius="$md" height={400} width={width * 0.6} />
            </XStack>
          ) : (
            parties?.parties &&
            parties.parties.length > 0 && (
              <FlashList
                horizontal
                renderItem={({ item }) => (
                  <PartyCard party={item} pl="$md" width={width * 0.6} />
                )}
                estimatedItemSize={400}
                keyExtractor={item => item.id}
                data={parties.parties}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingRight: tokens.space.md.val,
                }}
              />
            )
          )}
        </YStack>
      </ScrollView>
    </>
  );
}
