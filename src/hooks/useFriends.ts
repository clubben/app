import { GetFriendsRequest } from '@buf/jonas_clubben.bufbuild_es/friends/v1/friends_pb';
import { PartialMessage } from '@bufbuild/protobuf';
import { useQuery } from '@tanstack/react-query';
import { friendsClient } from 'data/apis/clients';

export function useFriends(req: PartialMessage<GetFriendsRequest>) {
  const res = useQuery({
    queryKey: ['friends', req],
    queryFn: () => friendsClient.getFriends(req),
  });

  return res;
}
