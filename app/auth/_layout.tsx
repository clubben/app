import Link from 'components/Link';
import { Stack, useRouter } from 'expo-router';
import { i18n } from 'hooks/i18n';
import { useAuth } from 'hooks/useAuth';

export default function Layout() {
  const { setSkipped } = useAuth();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        headerRight: ({ tintColor }) => (
          <Link
            onPress={() => {
              setSkipped(true);
              router.back();
            }}
            color={tintColor}>
            {i18n.t('onboarding.skip')}
          </Link>
        ),
      }}
    />
  );
}
