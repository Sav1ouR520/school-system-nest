import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '账号' })
  @Length(6, 20, { message: 'the length account should be 6 to 20' })
  readonly account: string;

  @ApiProperty({ description: '密码' })
  @Length(6, 30, { message: 'the length password should be 6 to 30' })
  readonly password: string;
}
