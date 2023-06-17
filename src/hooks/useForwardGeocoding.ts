import { ForwardGeocodingRequest } from '@buf/jonas_clubben.bufbuild_es/search/v1/search_pb';
import { PartialMessage } from '@bufbuild/protobuf';
import { useQuery } from '@tanstack/react-query';
import { searchClient } from 'data/apis/clients';

type Options = {
  enabled: boolean;
};

export const useForwardGeocoding = (
  req: PartialMessage<ForwardGeocodingRequest>,
  opts?: Options
) => {
  return useQuery(
    ['forwardGeocoding', req],
    () => searchClient.forwardGeocoding(req),
    {
      refetchOnMount: false,
      ...opts,
    }
  );
};
