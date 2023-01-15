import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: '任务名' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '任务简介' })
  @IsString()
  readonly introduce?: string;
}
