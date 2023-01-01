import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserIconDto {
  @ApiProperty({ description: '用户头像', format: 'binary' })
  @IsString()
  readonly icon: string;
}
