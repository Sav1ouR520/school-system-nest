import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetUser } from 'src/common';
import { CreateMessageDto, UpdateMessageDto, deleteMessageDto } from './dto';

@Controller('message')
@ApiTags('MessageController')
@ApiBearerAuth()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: '发送消息', description: '发送消息' })
  addMessage(@Body() messageDto: CreateMessageDto, @GetUser('id') id: string) {
    return this.messageService.addMessage(messageDto, id);
  }

  @Patch()
  @ApiOperation({ summary: '修改消息', description: '修改消息' })
  modifyMessage(
    @Body() messageDto: UpdateMessageDto,
    @GetUser('id') id: string,
  ) {
    return this.messageService.modifyMessage(messageDto, id);
  }

  @Delete()
  @ApiOperation({ summary: '删除消息', description: '删除消息' })
  deleteMessage(
    @Body() messageDto: deleteMessageDto,
    @GetUser('id') id: string,
  ) {
    return this.messageService.deleteMessage(messageDto, id);
  }
}
