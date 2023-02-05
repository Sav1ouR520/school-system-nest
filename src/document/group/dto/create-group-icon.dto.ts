import { ApiProperty } from '@nestjs/swagger';
import { CreateGroupDto } from '.';

export class CreateGroupWithIconDto extends CreateGroupDto {
  @ApiProperty({ description: '组图片', format: 'binary' })
  readonly icon?: string;
}
