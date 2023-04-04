import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

class UpdateGroupInfo {
  @ApiProperty({ description: '组名' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '更换者的UUID' })
  @IsUUID()
  readonly owner?: string;
}

export class UpdateGroupDto extends PartialType(UpdateGroupInfo) {
  @ApiProperty({ description: '组的id' })
  @IsUUID()
  readonly id: string;
}

export class UpdateGroupWithFileDto extends PartialType(UpdateGroupDto) {
  @ApiProperty({ description: '组图片', format: 'binary' })
  readonly icon?: string;
}
