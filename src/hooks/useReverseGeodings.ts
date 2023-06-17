import { ReverseGeocodingRequest } from '@buf/jonas_clubben.bufbuild_es/search/v1/search_pb';
import { PartialMessage } from '@bufbuild/protobuf';
import { useQuery } from '@tanstack/react-query';
import { searchClient } from 'data/apis/clients';

export const useReverseGeocoding = (
  req: PartialMessage<ReverseGeocodingRequest>
) => {
  return useQuery(
    ['reverseGeocoding', req],
    () => searchClient.reverseGeocoding(req),
    {
      refetchOnMount: false,
    }
  );
};
