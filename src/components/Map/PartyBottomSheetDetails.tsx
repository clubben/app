import { Party } from '@buf/jonas_clubben.bufbuild_es/party/v1/party_pb';
import { Stack } from '@tamagui/core';
import { PartyCardText } from 'components/PartyCard';
import { XStack } from 'components/Stacks';

type PartyBottomSheetDetailsProps = {
  party: Party;
};

const PartyBottomSheetDetails = ({ party }: PartyBottomSheetDetailsProps) => {
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
      <PartyCardText party={party} showDetails f={1} />
    </XStack>
  );
};

export default PartyBottomSheetDetails;
