import { Request } from 'express';

export function getReqIP(req: Request) {
  return req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
}
