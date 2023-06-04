import { Env } from 'src/Env';

import { createXHRGrpcWebTransport } from './custom_transport';
import { authInterceptor } from './interceptor';

export const transport = createXHRGrpcWebTransport({
  baseUrl: Env.BASE_URL,
  interceptors: [authInterceptor],
});
