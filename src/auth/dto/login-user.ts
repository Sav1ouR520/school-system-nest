import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: '账号' })
  readonly account: string;

  @IsNotEmpty()
  @ApiProperty({ description: '密码' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: '验证码' })
  readonly captcha: string;
}
