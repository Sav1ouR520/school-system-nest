import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailContext {
  @ApiProperty({ description: '邮箱' })
  @IsEmail()
  to: string;

  @ApiProperty({ description: '主题' })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: '验证码' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: '任务' })
  @IsNotEmpty()
  mission: string;
}
