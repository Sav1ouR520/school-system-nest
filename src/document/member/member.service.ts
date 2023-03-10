import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Group, ReturnData } from 'src/common';
import { UploadMemberDto } from './dto';
import { Member } from './entities';
import { MemberRole } from './enum';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MemberRepository')
    private readonly memberRepository: Repository<Member>,
    @Inject('GroupRepository')
    private readonly groupRepository: Repository<Group>,
  ) {}

  async beforeAction(groupId: string, userId: string, permission: boolean) {
    const group = await this.groupRepository.findOneBy({
      id: groupId,
      status: true,
    });
    if (!group) {
      throw new BadRequestException(`The group #${groupId} does not exist`);
    }
    const member = await this.memberRepository.findOneBy({
      groupId,
      userId,
      status: true,
    });
    if (!member) {
      throw new BadRequestException(`The user #${userId} is not in the group`);
    }
    if (permission && member.role !== 'admin') {
      throw new BadRequestException(
        `The user #${userId} does not have permission`,
      );
    }
    return member;
  }

  async findMemberByUserId(groupId: string, userId: string) {
    const member = await this.beforeAction(groupId, userId, false);
    return { action: true, data: member, message: 'Request data succeeded' };
  }

  async findMemberByMemberId(
    groupId: string,
    userId: string,
    memberId: string,
  ): Promise<ReturnData> {
    await this.beforeAction(groupId, userId, false);
    const data = await this.memberRepository.findOne({
      where: {
        groupId,
        id: memberId,
        status: true,
      },
      relations: ['user'],
    });
    if (!data) {
      throw new BadRequestException(`The user #${userId} is not in the group`);
    }
    const member = {
      id: data.id,
      groupId: data.groupId,
      userId: data.userId,
      name: data.name,
      role: data.role,
      joinTime: data.joinTime,
      icon: data.user.icon,
    };
    return { action: true, data: member, message: 'Request data succeeded' };
  }

  async findMemberByGroupId(
    groupId: string,
    userId: string,
  ): Promise<ReturnData> {
    await this.beforeAction(groupId, userId, false);
    const data = await this.memberRepository.find({
      where: { groupId, status: true },
      relations: ['user'],
    });
    const members = [];
    data.map((member) => {
      members.push({
        id: member.id,
        groupId: member.groupId,
        userId: member.userId,
        name: member.name,
        role: member.role,
        joinTime: member.joinTime,
        icon: member.user.icon,
      });
    });
    return {
      data: members,
      action: true,
      message: 'Request data succeeded',
    };
  }

  async deleteMember(ids: string[], userId: string): Promise<ReturnData> {
    const all_before_action_promise: Promise<Member>[] = [];
    const members: Member[] = [];
    for (const i in ids) {
      const member = await this.memberRepository.findOneBy({
        id: ids[i],
        status: true,
      });
      if (!member) {
        throw new BadRequestException(`member #${ids[i]} dose not exist`);
      }
      if (member.userId === userId) {
        throw new BadRequestException(`You can't delete yourself`);
      }
      if (member.role === MemberRole.ADMIN) {
        throw new BadRequestException(`You cannot delete administrator user`);
      }
      all_before_action_promise.push(
        this.beforeAction(member.groupId, userId, true),
      );
      member.status = false;
      members.push(member);
    }
    await Promise.all(all_before_action_promise);
    await this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(members);
      },
    );
    return {
      action: true,
      message: 'Member deleted successfully',
    };
  }

  async modifyMemberWithAdmin(
    memberDto: UploadMemberDto,
    onwer: string,
  ): Promise<ReturnData> {
    const { id, name, role, groupId } = memberDto;
    const m = await this.beforeAction(groupId, onwer, true);
    if (role && id === m.id) {
      throw new BadRequestException(`You can't modify your own permissions`);
    }
    const member = await this.memberRepository.preload({
      id,
      name,
      role,
      groupId,
    });
    if (!member) {
      throw new BadRequestException('Member does not exist');
    }
    await this.memberRepository.save(member);
    return {
      action: true,
      message: 'Member modify successfully',
    };
  }
}
