import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({ description: '任务id' })
  @IsUUID()
  readonly taskId: string;
}

export class CreateFileWithDataDto extends CreateFileDto {
  @ApiProperty({ description: '提交的文件', format: 'binary' })
  @IsNotEmpty()
  readonly file: string;
}
