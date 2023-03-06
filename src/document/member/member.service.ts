import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Group, ReturnData, User } from 'src/common';
import { CreateMemberDto, UploadMemberDto, deleteMemberDto } from './dto';
import { Member } from './entities';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MemberRepository')
    private readonly memberRepository: Repository<Member>,
    @Inject('GroupRepository')
    private readonly groupRepository: Repository<Group>,
    @Inject('UserRepository')
    private readonly userRepository: Repository<User>,
  ) {}

  async beforeAction(
    id: string,
    owner?: string,
    activeStatus = true,
    checkOwner = false,
  ) {
    const group = await this.groupRepository.findOneBy({
      id,
      owner,
      activeStatus,
    });
    if (!group) {
      if (checkOwner) {
        throw new BadRequestException(
          `The group #${id} does not belong to this user #${owner}`,
        );
      } else {
        throw new BadRequestException(`The group #${id} does not exist`);
      }
    }
  }

  async findMember(groupId: string): Promise<ReturnData> {
    await this.beforeAction(groupId);
    const data = await this.memberRepository.find({
      where: { groupId },
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

  async addMember(
    memberDto: CreateMemberDto,
    onwer: string,
  ): Promise<ReturnData> {
    const { groupId } = memberDto;
    const members: Member[] = [];
    await this.beforeAction(groupId, onwer);
    for (const member of memberDto.members) {
      const user = await this.userRepository.findOneBy({ id: member.userId });
      const entity = this.memberRepository.create({
        groupId,
        ...member,
        name: user.username,
      });
      members.push(entity);
    }
    await this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(members);
      },
    );
    return {
      action: true,
      message: 'Member added successfully',
    };
  }

  async deleteMember(
    memberDto: deleteMemberDto,
    onwer: string,
  ): Promise<ReturnData> {
    const { groupId } = memberDto;
    const members: Member[] = [];
    await this.beforeAction(groupId, onwer);
    for (const member of memberDto.members) {
      const { id, userId } = member;
      const entity = await this.memberRepository.findOneBy({
        id,
        groupId,
        userId,
      });
      if (userId === onwer) {
        throw new BadRequestException(`You can't modify your own permissions`);
      }
      if (!entity) {
        throw new BadRequestException('Entity does not exist');
      }
      members.push(entity);
    }
    await this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.delete(Member, members);
      },
    );
    return {
      action: true,
      message: 'Member deleted successfully',
    };
  }

  async modifyMember(
    memberDto: UploadMemberDto,
    onwer: string,
  ): Promise<ReturnData> {
    const { groupId } = memberDto;
    const members: Member[] = [];
    await this.beforeAction(groupId, onwer);
    for (const member of memberDto.members) {
      const { id, userId, role, name } = member;
      const entity = await this.memberRepository.findOneBy({
        id,
        groupId,
        userId,
      });
      if (userId === onwer) {
        throw new BadRequestException(`You can't modify your own permissions`);
      }
      if (!entity) {
        throw new BadRequestException('Entity does not exist');
      }
      role ? (entity.role = role) : undefined;
      name ? (entity.name = name) : undefined;
      members.push(entity);
    }
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
}
