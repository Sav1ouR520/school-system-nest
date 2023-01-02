import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const getRole = this.reflector.get<string[]>('roles', context.getHandler());
    const role = getRole
      ? getRole
      : this.reflector.get<string[]>('roles', context.getClass());
    const uuid = context.switchToHttp().getRequest()['user']['uuid'];
    const user = this.userService.findByUUID(uuid) as Promise<User>;
    return role.includes((await user).role);
  }
}
