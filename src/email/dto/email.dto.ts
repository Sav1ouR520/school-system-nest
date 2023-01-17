import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailDto {
  @ApiProperty({ description: '邮箱' })
  @IsEmail()
  to: string;
}
