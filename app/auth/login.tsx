import { Eye } from '@tamagui/lucide-icons';
import { Button } from 'components/Button';
import GoogleLogo from 'components/GoogleLogo';
import { Input } from 'components/Input';
import { Separator } from 'components/Separator';
import { XStack, YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { Stack } from 'expo-router';
import { i18n } from 'hooks/i18n';
import { useState } from 'react';

export default function LogIn() {
  const [secure, setSecure] = useState(true);

  return (
    <>
      <Stack.Screen options={{ title: i18n.t('logIn.title') }} />

      <YStack space="$md" p="$md">
        <Text>{i18n.t('logIn.subheading')}</Text>

        <YStack space="$md">
          <Button
            onPress={() => console.warn('Google sign in not yet implemented')}>
            <Button.Icon>
              <GoogleLogo height={22} width={22} />
            </Button.Icon>
            <Button.Text>Google</Button.Text>
          </Button>
        </YStack>

        <XStack ai="center">
          <Separator />
          <Text mx="$md">{i18n.t('auth.or')}</Text>
          <Separator />
        </XStack>

        <Input>
          <Input.Value
            value="email"
            placeholder={i18n.t('email')}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Input>
        <Input>
          <Input.Value
            value="password"
            placeholder={i18n.t('password')}
            textContentType="password"
            secureTextEntry={secure}
            autoCorrect={false}
          />
          <Input.Button onPress={() => setSecure(prev => !prev)}>
            <Eye />
          </Input.Button>
        </Input>

        <Button
          variant="accent"
          onPress={() => console.warn('Log in not yet implemented')}>
          <Button.Text>{i18n.t('auth.logIn')}</Button.Text>
        </Button>
      </YStack>
    </>
  );
}
