import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ description: '发送内容' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: '组id' })
  @IsUUID()
  groupId: string;
}
