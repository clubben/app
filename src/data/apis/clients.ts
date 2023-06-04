import { AuthService } from '@buf/jonas_clubben.bufbuild_connect-es/auth/v1/auth_connect';
import { FriendsService } from '@buf/jonas_clubben.bufbuild_connect-es/friends/v1/friends_connect';
import { PartyService } from '@buf/jonas_clubben.bufbuild_connect-es/party/v1/party_connect';
import { ProfileService } from '@buf/jonas_clubben.bufbuild_connect-es/profile/v1/profile_connect';
import { createPromiseClient } from '@bufbuild/connect';

import { transport } from './transport';

export const authClient = createPromiseClient(AuthService, transport);
export const profileClient = createPromiseClient(ProfileService, transport);
export const partyClient = createPromiseClient(PartyService, transport);
export const friendsClient = createPromiseClient(FriendsService, transport);
