import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolesEnum } from '../types/roles.types';
import { AuthRequest } from '../types/user.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: RolesEnum[] | undefined = this.reflector.getAllAndOverride(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!roles || roles.length === 0) return true;

    const user = context.switchToHttp().getRequest<AuthRequest>().user;

    const permitted = roles.some((r) => r === user.role);
    if (!permitted) throw new ForbiddenException('Forbidden');
    return true;
  }
}
