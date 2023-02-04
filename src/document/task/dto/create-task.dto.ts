import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: '任务名' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '组id' })
  @IsUUID()
  readonly groudId: string;

  @ApiProperty({ description: '任务简介' })
  @IsString()
  readonly introduce?: string;

  @ApiProperty({ description: '前置文件', format: 'binary' })
  readonly icon?: any;
}
