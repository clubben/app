import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { Button } from 'components/Button';
import GoogleLogo from 'components/GoogleLogo';
import { Input } from 'components/Input';
import { ScrollView } from 'components/ScrollView';
import { Separator } from 'components/Separator';
import { XStack, YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Stack } from 'expo-router';
import { i18n } from 'hooks/i18n';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';

export default function LogIn() {
  const scheme = useColorScheme();
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, appleSignIn, googleSignIn, signInLoading } = useAuth();

  return (
    <>
      <Stack.Screen options={{ title: i18n.t('logIn.title') }} />

      <ScrollView space="$md" p="$md">
        <Text>{i18n.t('logIn.subheading')}</Text>

        <YStack space="$md">
          <Button onPress={googleSignIn}>
            <Button.Icon>
              <GoogleLogo height={22} width={22} />
            </Button.Icon>
            <Button.Text>Google</Button.Text>
          </Button>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
            }
            buttonStyle={
              scheme === 'dark'
                ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={5}
            style={{
              width: '100%',
              height: 45,
            }}
            onPress={appleSignIn}
          />
        </YStack>

        <XStack ai="center">
          <Separator />
          <Text mx="$md">{i18n.t('auth.or')}</Text>
          <Separator />
        </XStack>

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

        <Button variant="accent" onPress={() => signIn(email, password)}>
          {signInLoading ? (
            <ActivityIndicator />
          ) : (
            <Button.Text>{i18n.t('auth.logIn')}</Button.Text>
          )}
        </Button>
      </ScrollView>
    </>
  );
}
