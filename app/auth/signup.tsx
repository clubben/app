import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { Button } from 'components/Button';
import GoogleLogo from 'components/GoogleLogo';
import { Input } from 'components/Input';
import { ScrollView } from 'components/ScrollView';
import { Separator } from 'components/Separator';
import { XStack, YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { Stack } from 'expo-router';
import { i18n } from 'hooks/i18n';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function SignUp() {
  const { signUp, signUpLoading, googleSignIn } = useAuth();
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    signUp({ email, password });
  }

  return (
    <>
      <Stack.Screen options={{ title: i18n.t('signUp.title') }} />

      <ScrollView space="$md" p="$md">
        <Text variant="body">{i18n.t('signUp.subheading')}</Text>

        <YStack>
          <Button onPress={googleSignIn}>
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

        <YStack space="$md">
          <Input>
            <Input.Value
              value={email}
              onChangeText={val => setEmail(val)}
              placeholder={i18n.t('email')}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Input>
          <Input>
            <Input.Value
              value={password}
              onChangeText={val => setPassword(val)}
              placeholder={i18n.t('password')}
              textContentType="password"
              secureTextEntry={secure}
              autoCorrect={false}
            />
            <Input.Button onPress={() => setSecure(prev => !prev)}>
              {secure ? <Eye /> : <EyeOff />}
            </Input.Button>
          </Input>
        </YStack>

        <Button variant="accent" onPress={onSubmit}>
          {signUpLoading ? (
            <ActivityIndicator />
          ) : (
            <Button.Text>{i18n.t('auth.signUp')}</Button.Text>
          )}
        </Button>
      </ScrollView>
    </>
  );
}
