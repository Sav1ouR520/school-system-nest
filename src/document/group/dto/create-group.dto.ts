import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ description: '组名' })
  @IsNotEmpty()
  readonly name: string;
}
