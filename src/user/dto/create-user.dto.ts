import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '账号' })
  @IsEmail()
  readonly account: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: '验证码' })
  @IsNotEmpty()
  readonly captcha: string;
}
