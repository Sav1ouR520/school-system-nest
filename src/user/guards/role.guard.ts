import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { ReturnData } from 'src/common';

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
    const id = context.switchToHttp().getRequest()['user']['id'];
    const user = this.userService.findUserById(id) as Promise<ReturnData<User>>;
    return role.includes((await user).data.role);
  }
}
