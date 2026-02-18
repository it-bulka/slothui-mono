import { Request } from 'express';
export const getRefreshTokenFromReq = (req: Request) => {
  return req.cookies['refresh_token'] as string | undefined;
};
