import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FileDto {
  @ApiProperty({ description: '任务id' })
  @IsUUID()
  readonly taskId: string;

  @ApiProperty({ description: '提交的文件', format: 'binary' })
  @IsNotEmpty()
  readonly file: any;
}
