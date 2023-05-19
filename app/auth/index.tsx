import { ArrowRight, PartyPopper, Wine } from '@tamagui/lucide-icons';
import Link from 'components/Link';
import { XStack, YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { Stack, useRouter } from 'expo-router';
import { i18n } from 'hooks/i18n';

export default function Auth() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: i18n.t('onboarding.title'),
        }}
      />
      <YStack p="$md" space="$lg">
        <Text>{i18n.t('onboarding.subheading')}</Text>
        <YStack space="$lg">
          <ChooseButton
            title={i18n.t('onboarding.user.title')}
            description={i18n.t('onboarding.user.subheading')}
            icon={<PartyPopper size="$sm" color="$iconPrimary" />}
            onPress={() => router.push({ pathname: '/auth/signup' })}
          />
          <ChooseButton
            title={i18n.t('onboarding.company.title')}
            description={i18n.t('onboarding.company.subheading')}
            icon={<Wine size="$sm" color="$iconPrimary" />}
            disabled
          />
        </YStack>

        <XStack jc="center" ai="center">
          <Text>{i18n.t('onboarding.alreadyAccount')} </Text>
          <Link href="/auth/login">Log in</Link>
        </XStack>
      </YStack>
    </>
  );
}

interface ChooseButtonProps {
  icon: React.ReactNode;
  title: string;
  disabled?: boolean;
  description: string;
  onPress?: () => void;
}

const ChooseButton = ({
  icon,
  title,
  description,
  disabled,
  onPress,
}: ChooseButtonProps) => {
  return (
    <XStack
      onPress={onPress}
      p="$md"
      bc="$backgroundOverlaySecondary"
      boc="$borderSecondary"
      br="$md"
      borderWidth={1}
      ai="center"
      opacity={disabled ? 0.4 : 1}
      pressStyle={{
        bc: '$backgroundOverlayPrimary',
      }}>
      <YStack f={1}>
        {icon}
        <Text variant="headline">{title}</Text>
        <Text variant="caption" color="$placeholderColor">
          {description}
        </Text>
      </YStack>
      <ArrowRight color="$iconPrimary" />
    </XStack>
  );
};
