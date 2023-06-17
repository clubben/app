import { Party } from '@buf/jonas_clubben.bufbuild_es/party/v1/party_pb';
import { Calendar, Clock, MapPin } from '@tamagui/lucide-icons';
import { Chip } from 'components/Chip';
import CollapsibleParagraph from 'components/CollapsibleParagraph';
import { Separator } from 'components/Separator';
import { XStack, YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { useI18n } from 'hooks/i18n';
import dayjs from 'hooks/i18n/lib/dayjs';

type PartyBottomSheetDetailsProps = {
  party: Party;
};

const PartyBottomSheetDetails = ({ party }: PartyBottomSheetDetailsProps) => {
  const i18n = useI18n();

  return (
    <YStack
      f={1}
      borderTopLeftRadius="$lg"
      borderTopRightRadius="$lg"
      bc="$backgroundPrimary"
      mx="$md"
      space="$md">
      {party.musicTypes?.length > 0 && (
        <XStack space="$md">
          {party.musicTypes?.map((music, i) => (
            <Chip pressStyle={{}} key={i}>
              <Chip.Text>{music}</Chip.Text>
            </Chip>
          ))}
        </XStack>
      )}
      {/* 
      <XStack space="$md">
        {stories.length > 0 && (
          <StoryAvatar stories={stories}>
            <Avatar size="m" imageSource={stories[0].media.preview} />
          </StoryAvatar>
        )}
        <H2>{party.title}</H2>
      </XStack> */}

      {party.address && (
        <XStack space="$md">
          <XStack ai="center" space="$sm">
            <Calendar size="$xs" />
            <Text>{dayjs(party.entry?.toDate()).format('D MMM')}</Text>
          </XStack>
          <Separator vertical />
          <XStack ai="center" space="$sm">
            <Clock size="$xs" />
            <Text>{i18n.date(party.entry?.toDate(), 'LT')}</Text>
          </XStack>
          <Separator vertical />
          <XStack ai="center" space="$sm">
            <MapPin size="$xs" />
            <Text>{party.address.streetAddress}</Text>
          </XStack>
        </XStack>
      )}

      {party.details && (
        <YStack>
          <Text variant="headline">{i18n.t('description')}</Text>
          <CollapsibleParagraph>{party.details}</CollapsibleParagraph>
        </YStack>
      )}
    </YStack>
  );
};

export default PartyBottomSheetDetails;
