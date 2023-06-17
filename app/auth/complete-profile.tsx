import { X } from '@tamagui/lucide-icons';
import { Avatar } from 'components/Avatar';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { ScrollView } from 'components/ScrollView';
import { YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { profileClient } from 'data/apis/clients';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { i18n } from 'hooks/i18n';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';

export default function CompleteProfile() {
  const { me } = useAuth();
  const [name, setName] = useState(me?.profile?.name ?? '');
  const [username, setUsername] = useState(me?.profile?.username ?? '');
  const [avatar, setAvatar] = useState(me?.profile?.avatar);

  async function onSubmit() {
    const profile = await profileClient.createProfile({
      username,
      name,
      avatar,
    });
  }

  return (
    <>
      <Head>
        <title>Complete Profile</title>
      </Head>
      <Stack.Screen
        options={{
          title: i18n.t('completeProfile.title'),
          headerRight: () => null,
        }}
      />

      <ScrollView space="$md" p="$md">
        <Avatar als="center" onPress={() => console.log('edit')}>
          <Avatar.Image source={avatar} />
          <Avatar.Edit />
        </Avatar>

        <Input>
          <Input.Value
            value={name}
            onChangeText={setName}
            placeholder={i18n.t('name')}
          />
        </Input>
        <YStack ai="center" space="$sm">
          <Input>
            <Input.Icon>
              <Text variant="caption" col="$iconDisabled">
                @
              </Text>
            </Input.Icon>
            <Input.Value
              value={username}
              onChangeText={setUsername}
              placeholder={i18n.t('userName')}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input.Icon>
              <X color="red" />
            </Input.Icon>
          </Input>
          <Text variant="caption">
            {i18n.t('completeProfile.usernameCaption')}
          </Text>
        </YStack>
        <Button variant="accent" onPress={onSubmit}>
          <Button.Text col="$textAlwaysWhite">
            {i18n.t('completeProfile.action')}
          </Button.Text>
        </Button>
      </ScrollView>
    </>
  );
}
