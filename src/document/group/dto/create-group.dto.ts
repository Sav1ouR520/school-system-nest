import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ description: '组名' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '组图片', format: 'binary' })
  readonly file?: any;
}
