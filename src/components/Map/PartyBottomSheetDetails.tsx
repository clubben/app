import { Party } from '@buf/jonas_clubben.bufbuild_es/party/v1/party_pb';
import { Stack } from '@tamagui/core';
import { Calendar, MapPin } from '@tamagui/lucide-icons';
import distance from '@turf/distance';
import { Chip } from 'components/Chip';
import CollapsibleParagraph from 'components/CollapsibleParagraph';
import { Separator } from 'components/Separator';
import { XStack, YStack } from 'components/Stacks';
import { Text } from 'components/Text';
import { useI18n } from 'hooks/i18n';
import dayjs from 'hooks/i18n/lib/dayjs';
import { useLocation } from 'hooks/useLocation';
import { round } from 'utils/round';

type PartyBottomSheetDetailsProps = {
  party: Party;
};

const PartyBottomSheetDetails = ({ party }: PartyBottomSheetDetailsProps) => {
  const i18n = useI18n();
  const { location } = useLocation();

  const distanceUnit =
    i18n.getLocale().measurementSystem === 'metric' ? 'kilometers' : 'miles';

  return (
    <XStack
      f={1}
      borderTopLeftRadius="$lg"
      borderTopRightRadius="$lg"
      bc="$backgroundPrimary"
      mx="$md"
      space="$md">
      <Stack br="$md" bc="gray" width="30%" aspectRatio={9 / 16} />
      {/* 
      <XStack space="$md">
        {stories.length > 0 && (
          <StoryAvatar stories={stories}>
            <Avatar size="m" imageSource={stories[0].media.preview} />
          </StoryAvatar>
        )}
        <H2>{party.title}</H2>
      </XStack> */}

      <YStack space="$md" f={1}>
        <Text variant="h2">{party.title}</Text>

        {party.musicTypes?.length > 0 && (
          <XStack space="$md">
            {party.musicTypes?.map((music, i) => (
              <Chip size="$sm" pressStyle={{}} key={i}>
                <Chip.Text>{music}</Chip.Text>
              </Chip>
            ))}
          </XStack>
        )}

        {party.details && (
          <CollapsibleParagraph>{party.details}</CollapsibleParagraph>
        )}

        {party.entry && (
          <XStack ai="center" space="$md">
            <Calendar size="$xs" />
            <Text>
              {dayjs(party.entry.toDate()).format('D MMM')} -{' '}
              {i18n.date(party.entry.toDate(), 'LT')}
            </Text>
          </XStack>
        )}

        {party.address && (
          <XStack ai="center" space="$md">
            <MapPin size="$xs" />
            <Text>
              {party.address.streetAddress}
              {location &&
                party.position &&
                ` - ${round(
                  distance(
                    [location.coords.longitude, location.coords.latitude],
                    [party.position?.longitude, party.position?.latitude],
                    {
                      units: distanceUnit,
                    }
                  ),
                  2
                )} ${distanceUnit === 'kilometers' ? 'km' : 'mi'}`}
            </Text>
          </XStack>
        )}
      </YStack>
    </XStack>
  );
};

export default PartyBottomSheetDetails;
