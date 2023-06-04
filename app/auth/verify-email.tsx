import { MailOpen } from '@tamagui/lucide-icons';
import { Button } from 'components/Button';
import Link from 'components/Link';
import { ScrollView } from 'components/ScrollView';
import { XStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { authClient } from 'data/apis/clients';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { i18n } from 'hooks/i18n';
import { useAuth } from 'hooks/useAuth';

export default function VerifyEmail() {
  const { me } = useAuth();

  return (
    <>
      <Head>
        <title>Complete Profile</title>
      </Head>
      <Stack.Screen
        options={{
          title: 'Verify your email',
          headerRight: () => null,
          headerBackVisible: false,
        }}
      />

      <ScrollView
        p="$md"
        space="$md"
        contentContainerStyle={{ alignItems: 'center' }}>
        <MailOpen size="$md" />

        <XStack ai="center" flexWrap="wrap" jc="center">
          <Text>{i18n.t('verifyEmail.description')}</Text>
          <Text variant="headline">{me?.email}</Text>
        </XStack>

        <XStack space="$sm">
          <Text>{i18n.t('verifyEmail.notArrived')}</Text>
          <Link onPress={() => console.log('resend')}>
            {i18n.t('verifyEmail.sendAgain')}
          </Link>
        </XStack>

        {/* TODO: remove */}
        <Button
          onPress={async () => {
            const a = await authClient.verifyEmail({ userID: me?.id });
            console.log(JSON.stringify(a));
          }}>
          <Button.Text>Verify now</Button.Text>
        </Button>
      </ScrollView>
    </>
  );
}
