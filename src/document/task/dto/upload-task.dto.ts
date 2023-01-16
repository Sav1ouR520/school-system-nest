import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class TaskFileInfo extends CreateTaskDto {
  @ApiProperty({ description: '任务id' })
  @IsUUID()
  readonly id: string;

  @ApiProperty({ description: '是否有数据' })
  @IsBoolean()
  readonly hasData: boolean;
}

export class UploadTaskDto extends OmitType(TaskFileInfo, [
  'groudId',
] as const) {}
