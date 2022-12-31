import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: '账号', example: 'helloworld' })
  readonly account: string;

  @IsNotEmpty()
  @ApiProperty({ description: '密码', example: 'helloworld' })
  readonly password: string;
}
