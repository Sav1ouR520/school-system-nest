import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ReturnData } from '..';

@Injectable()
export class StatusGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPulic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPulic) return true;
    const user = context.switchToHttp().getRequest()['user'];
    if (user) {
      const result = this.userService.findUserById(user.id) as Promise<
        ReturnData<User>
      >;
      return (await result).data.status;
    }
    return false;
  }
}
