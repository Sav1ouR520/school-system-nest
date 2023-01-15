import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

class UpdateGroupInfo {
  @ApiProperty({ description: '组名' })
  readonly name: string;

  @ApiProperty({ description: '更换者的UUID' })
  @IsUUID()
  readonly owner: string;
}

export class UpdateGroupDto extends PartialType(UpdateGroupInfo) {
  @ApiProperty({ description: '组的id' })
  @IsNotEmpty()
  readonly id: string;
}