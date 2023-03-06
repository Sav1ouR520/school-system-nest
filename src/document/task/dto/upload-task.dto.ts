import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class TaskFileInfo extends CreateTaskDto {
  @ApiProperty({ description: '任务id' })
  @IsUUID()
  readonly id: string;
}

export class ModifyTaskDto extends OmitType(TaskFileInfo, [
  'groupId',
] as const) {}

export class ModifyTaskWithFile extends ModifyTaskDto {
  @ApiProperty({ description: '前置文件', format: 'binary' })
  readonly file?: string;
}
