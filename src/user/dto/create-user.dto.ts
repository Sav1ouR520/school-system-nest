import { ApiProperty } from '@nestjs/swagger';
import { Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '账号' })
  @Length(6, 20, { message: 'the length account should be 6 to 20' })
  readonly account: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: '验证码' })
  @IsNotEmpty()
  readonly captcha: string;
}
