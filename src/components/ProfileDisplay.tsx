import { Profile } from '@buf/jonas_clubben.bufbuild_es/profile/v1/profile_pb';
import { SizeTokens } from '@tamagui/core';

import { Avatar } from './Avatar';
import { XStack, XStackProps, YStack } from './Stacks';
import { Text } from './Text';

type ProfileDisplayProps = XStackProps & {
  profile: Profile;
  size: SizeTokens;
  dense?: boolean;
};

const ProfileDisplay = (props: ProfileDisplayProps) => {
  const { profile, size, dense, ...rest } = props;

  return (
    <XStack space="$md" ai="center" {...rest}>
      <Avatar size={size ?? '$md'}>
        <Avatar.Image source={profile.avatar} />
      </Avatar>
      <YStack>
        <Text variant="headline">{profile.username}</Text>
        {!dense && <Text>{profile.name}</Text>}
      </YStack>
    </XStack>
  );
};

export default ProfileDisplay;
