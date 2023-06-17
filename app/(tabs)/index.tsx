import { Button } from 'components/Button';
import { YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { useAuth } from 'hooks/useAuth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const { top } = useSafeAreaInsets();
  const { logOut } = useAuth();

  return (
    <YStack mt={top}>
      <Text>Home</Text>
      <Button onPress={logOut}>
        <Button.Text>Log out</Button.Text>
      </Button>
    </YStack>
  );
}