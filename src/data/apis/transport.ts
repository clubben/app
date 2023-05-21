import { createConnectTransport } from '@bufbuild/connect-web';
import { Env } from 'src/Env';

import { authInterceptor } from './interceptor';

export const transport = createConnectTransport({
  baseUrl: Env.BASE_URL,
  interceptors: [authInterceptor],
});
