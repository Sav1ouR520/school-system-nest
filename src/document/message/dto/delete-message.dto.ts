import { OmitType } from '@nestjs/swagger';
import { UpdateMessageDto } from './update-message.dto';

export class deleteMessageDto extends OmitType(UpdateMessageDto, [
  'content',
] as const) {}
