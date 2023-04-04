import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../enum/userRole';
import { IsEnum, IsOptional } from 'class-validator';
export class SelectUserInfo {
  @ApiProperty({ description: '账号' })
  @IsOptional()
  readonly account: string;

  @ApiProperty({ description: '用户名' })
  @IsOptional()
  readonly username: string;

  @ApiProperty({ description: '注册时间' })
  @IsOptional()
  readonly registerTime: string;

  @ApiProperty({ description: '用户权限', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  readonly role: UserRole;

  @ApiProperty({ description: '激活状态', enum: UserStatus })
  @IsOptional()
  @IsEnum(UserStatus)
  readonly status: string;
}

export class SelectUserDto extends PartialType(SelectUserInfo) {}
