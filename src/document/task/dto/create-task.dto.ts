import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: '任务名' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '组id' })
  @IsUUID()
  readonly groupId: string;

  @ApiProperty({ description: '任务简介' })
  @IsNotEmpty()
  readonly introduce: string;
}

export class CreateTaskWithFile extends CreateTaskDto {
  @ApiProperty({ description: '前置文件', format: 'binary' })
  readonly file?: string;
}
