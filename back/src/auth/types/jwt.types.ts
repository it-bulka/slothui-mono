import { RolesEnum } from '../../common/types/roles.types';
export type AuthJwtPayload = {
  sub: string;
  role: RolesEnum;
};

export type AuthJwtUser = {
  id: string;
  role: RolesEnum;
};
