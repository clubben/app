import { useTheme } from '@tamagui/core';
import { Camera } from '@tamagui/lucide-icons';
import { Button } from 'components/Button';
import { ScrollView } from 'components/ScrollView';
import { Text } from 'components/Text';
import { Stack as ExpoStack, useRouter } from 'expo-router';
import { useAuth } from 'hooks/useAuth';

export default function Home() {
  const { logOut } = useAuth();
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <ExpoStack.Screen
        options={{
          headerTitle: 'Home',
          headerStyle: {
            backgroundColor: theme.backgroundPrimary.val,
          },
          headerRight: () => (
            <Button variant="ghost" onPress={() => router.push('/home/camera')}>
              <Button.Icon>
                <Camera />
              </Button.Icon>
            </Button>
          ),
        }}
      />

      <ScrollView mx="$md">
        <Text>Home</Text>
        <Button onPress={logOut}>
          <Button.Text>Log out</Button.Text>
        </Button>
      </ScrollView>
    </>
  );
}
