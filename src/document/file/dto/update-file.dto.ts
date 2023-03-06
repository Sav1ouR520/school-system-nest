import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends CreateFileDto {
  @ApiProperty({ description: '文件id' })
  @IsUUID()
  readonly id: string;
}

export class UpdateFileWithDataDto extends UpdateFileDto {
  @ApiProperty({ description: '提交的文件', format: 'binary' })
  @IsNotEmpty()
  readonly file: string;
}
