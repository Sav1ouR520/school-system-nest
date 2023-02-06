import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends CreateMessageDto {
  @ApiProperty({ description: '消息id' })
  @IsUUID()
  id: string;
}
