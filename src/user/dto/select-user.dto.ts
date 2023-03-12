import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserRole } from '../enum/userRole';
import { IsEnum } from 'class-validator';
export class SelectUserOtherInfoDto {
  @ApiProperty({ description: '账号' })
  readonly account: string;

  @ApiProperty({ description: '用户名' })
  readonly username: string;

  @ApiProperty({ description: '注册时间' })
  readonly registerTime: string;

  @ApiProperty({ description: '用户权限', enum: UserRole })
  @IsEnum(UserRole)
  readonly role: UserRole;
}

export class SelectUserDto extends PartialType(SelectUserOtherInfoDto) {}
