import { FlashList } from '@shopify/flash-list';
import { Plus } from '@tamagui/lucide-icons';
import { useFriends } from 'hooks/useFriends';

import { Avatar } from './Avatar';
import { Button } from './Button';
import { YStack } from './Stacks';
import { Text } from './Text';

interface FriendListProps {
  userId: string;
}

const FriendList = ({ userId }: FriendListProps) => {
  const { data, isLoading } = useFriends({
    userID: userId,
    accepted: true,
    limit: 10,
  });

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <FlashList
      data={data?.friends ?? []}
      horizontal
      estimatedItemSize={100}
      renderItem={({ item }) => {
        return (
          <YStack jc="center" ai="center" px="$sm">
            <Avatar>
              <Avatar.Image source={item.profile?.avatar} />
            </Avatar>
            <Text variant="caption">{item.profile?.username}</Text>
          </YStack>
        );
      }}
      ListHeaderComponent={
        <Button ml="$md">
          <Button.Icon>
            <Plus />
          </Button.Icon>
        </Button>
      }
    />
  );
};

export default FriendList;
