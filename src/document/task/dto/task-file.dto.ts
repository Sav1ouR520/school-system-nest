import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TaskFileDto {
  @ApiProperty({ description: '前置文件', format: 'binary' })
  @IsString()
  readonly file?: string;
}
