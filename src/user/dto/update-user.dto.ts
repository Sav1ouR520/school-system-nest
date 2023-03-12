import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '用户名' })
  @Length(6, 20, { message: 'the length username should be 6 to 20' })
  @IsOptional()
  readonly username: string;

  @ApiProperty({ description: '激活状态' })
  @IsOptional()
  readonly status: boolean;
}

export class UpdateUserUsernameDto {
  @ApiProperty({ description: '用户名' })
  @Length(6, 20, { message: 'the length username should be 6 to 20' })
  readonly username: string;
}

export class UpdateUserPasswordDto {
  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  readonly oldPassword: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  readonly newPassword: string;

  @ApiProperty({ description: '验证码' })
  @IsNotEmpty()
  readonly captcha: string;
}

export class UpdateUserIconDto {
  @ApiProperty({ description: '用户头像', format: 'binary' })
  readonly icon?: string;
}
