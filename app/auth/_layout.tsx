import Link from 'components/Link';
import { Stack } from 'expo-router';
import { i18n } from 'hooks/i18n';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerRight: ({ tintColor, canGoBack }) => (
          <Link href="/" color={tintColor}>
            {i18n.t('onboarding.skip')}
          </Link>
        ),
      }}
    />
  );
}
