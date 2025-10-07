import { Request } from 'express';
import { AuthJwtUser } from '../../auth/types/jwt.types';

export interface AuthRequest extends Request {
  user: AuthJwtUser;
}
