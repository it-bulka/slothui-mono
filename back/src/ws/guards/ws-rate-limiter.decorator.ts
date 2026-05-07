import { SetMetadata } from '@nestjs/common';

export const WS_RATE_LIMIT_KEY = 'ws_rate_limit';

export const WsRateLimit = (points: number, duration: number) =>
  SetMetadata(WS_RATE_LIMIT_KEY, { points, duration });
