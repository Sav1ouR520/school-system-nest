import { PartialType } from '@nestjs/swagger';
import { UserInfo } from './create-user.dto';

export class UpdateUserDto extends PartialType(UserInfo) {}
