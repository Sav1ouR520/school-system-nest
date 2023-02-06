import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Message } from './entities';
import { Repository } from 'typeorm';
import { Member } from '../member/entities';
import { CreateMessageDto, UpdateMessageDto, deleteMessageDto } from './dto';
import { MemberRole } from '../member/enum';
import { ReturnData } from 'src/common';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MessageRepository')
    private readonly messageRepository: Repository<Message>,
    @Inject('MemberRepository')
    private readonly memberRepository: Repository<Member>,
  ) {}

  async beforeAction(groupId: string, userId: string) {
    const memebr = await this.memberRepository.findOneBy({
      groupId,
      userId,
    });
    if (!memebr) {
      throw new BadRequestException(
        `This user #${userId} does not belong to this group #${groupId}`,
      );
    }
  }

  async addMessage(
    messageDto: CreateMessageDto,
    userId: string,
  ): Promise<ReturnData> {
    await this.beforeAction(messageDto.groupId, userId);
    const message = this.messageRepository.create({ ...messageDto, userId });
    await this.messageRepository.save(message);
    return {
      action: true,
      message: 'message send successfully',
    };
  }

  async modifyMessage(
    messageDto: UpdateMessageDto,
    userId: string,
  ): Promise<ReturnData> {
    await this.beforeAction(messageDto.groupId, userId);
    const result = await this.messageRepository.preload({
      ...messageDto,
      userId,
    });
    await this.messageRepository.save(result);
    return {
      action: true,
      message: `Successfully updated task #${messageDto.id} information`,
    };
  }

  async deleteMessage(
    messageDto: deleteMessageDto,
    userId: string,
  ): Promise<ReturnData> {
    const { id, groupId } = messageDto;
    await this.beforeAction(groupId, userId);
    const member = await this.memberRepository.findOneBy({ groupId, userId });
    const message = await this.messageRepository.findOneBy({
      ...messageDto,
      userId,
    });
    if (message || member.role === MemberRole.ADMIN) {
      const result = await this.messageRepository.delete(id);
      if (result.affected === 1) {
        return {
          action: true,
          message: 'Message has been deleted',
        };
      }
    }
    return {
      action: false,
      message: 'Failed to delete message',
    };
  }
}
