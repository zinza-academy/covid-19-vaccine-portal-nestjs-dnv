import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseAuthGuard } from './base-auth.guard';

@Injectable()
export class RolesGuard extends BaseAuthGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    return this.matchRoles(roles, user.role);
  }
}
