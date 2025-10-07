import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../types/roles.types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [RolesEnum, ...RolesEnum[]]) =>
  SetMetadata(ROLES_KEY, [...roles]);
