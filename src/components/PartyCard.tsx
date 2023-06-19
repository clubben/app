import { Party } from '@buf/jonas_clubben.bufbuild_es/party/v1/party_pb';
import { Stack } from '@tamagui/core';
import { Calendar, MapPin } from '@tamagui/lucide-icons';
import distance from '@turf/distance';
import dayjs from 'dayjs';
import { useI18n } from 'hooks/i18n';
import { useLocation } from 'hooks/useLocation';
import { round } from 'lodash';

import { Chip } from './Chip';
import CollapsibleParagraph from './CollapsibleParagraph';
import { XStack, YStack, YStackProps } from './Stacks';
import { Text } from './Text';

type PartyCardProps = YStackProps & {
  party: Party;
};

export default function PartyCard(props: PartyCardProps) {
  const { party, ...rest } = props;
  return (
    <YStack {...rest} scale={0.99} pressStyle={{ scale: 1 }}>
      <Stack
        borderTopLeftRadius="$md"
        borderTopRightRadius="$md"
        bc="gray"
        height={300}
        width="100%"
      />
      <PartyCardText
        party={party}
        p="$md"
        bc="$backgroundSecondary"
        borderBottomLeftRadius="$md"
        borderBottomRightRadius="$md"
        height={100}
      />
    </YStack>
  );
}

type PartyCardTextProps = YStackProps & {
  party: Party;
  showDetails?: boolean;
};
export function PartyCardText(props: PartyCardTextProps) {
  const { party, showDetails, ...rest } = props;
  const i18n = useI18n();
  const { location } = useLocation();

  const distanceUnit =
    i18n.getLocale().measurementSystem === 'metric' ? 'kilometers' : 'miles';

  return (
    <YStack space="$sm" {...rest}>
      <Text variant="h3">{party.title}</Text>

      {party.musicTypes?.length > 0 && (
        <XStack space="$md">
          {party.musicTypes?.map((music, i) => (
            <Chip size="$sm" pressStyle={{}} key={i}>
              <Chip.Text>{music}</Chip.Text>
            </Chip>
          ))}
        </XStack>
      )}

      {party.details && showDetails && (
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
  );
}
