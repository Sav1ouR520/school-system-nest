import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { MemberRole } from '../member/enum';
import { Member, ReturnData, User } from 'src/common';
import { Group } from './entities';
import { nanoid } from 'nanoid';

@Injectable()
export class GroupService {
  constructor(
    @Inject('GroupRepository')
    private readonly groupRepository: Repository<Group>,
    @Inject('UserRepository')
    private readonly userRepository: Repository<User>,
    @Inject('MemberRepository')
    private readonly memberRepository: Repository<Member>,
  ) {}

  async beforeAction(id: string, owner: string) {
    const group = await this.groupRepository.findOneBy({ id, owner });
    if (!group) {
      throw new BadRequestException(
        `The group #${id} does not belong to this user #${owner}`,
      );
    }
  }

  async checkInviteCodeTime(group: Group) {
    const oneDay = 1000 * 60 * 60 * 24;
    if (group.CodeUpdateTime.valueOf() + oneDay < new Date().valueOf()) {
      group.inviteCode = nanoid();
      group.CodeUpdateTime = new Date();
      await this.groupRepository.save(group);
    }
    return group;
  }

  async updateInviteCode(
    groupId: string,
    userId: string,
    activeStatus = true,
  ): Promise<ReturnData> {
    const group = await this.groupRepository.findOneBy({
      id: groupId,
      activeStatus,
    });
    if (group) {
      const member = await this.memberRepository.findOneBy({ groupId, userId });
      if (!member || member.role !== 'admin') {
        throw new BadRequestException(
          `User #${userId} does not have permission`,
        );
      }
      group.inviteCode = nanoid();
      group.CodeUpdateTime = new Date();
      await this.groupRepository.save(group);
      const inviteCode = group.inviteCode;
      return {
        data: { inviteCode },
        action: true,
        message: 'Invitation code updated successfully',
      };
    }
    throw new BadRequestException(`group #${groupId} does not exist`);
  }

  async joinGroupByInviteCode(
    inviteCode: string,
    userId: string,
    activeStatus = true,
  ): Promise<ReturnData> {
    const group = await this.groupRepository.findOneBy({
      inviteCode,
      activeStatus,
    });
    if (group) {
      const group2 = await this.checkInviteCodeTime(group);
      if (group2.inviteCode === inviteCode) {
        const existMember = await this.memberRepository.findOneBy({
          userId,
          groupId: group.id,
        });
        if (existMember) {
          return {
            action: false,
            message: `The user #${userId} is already in this group`,
          };
        }
        const user = await this.userRepository.findOneBy({ id: userId });
        const name = user.username;
        const role = MemberRole.USER;
        const member = { user, group, name, role };
        await this.memberRepository.save(member);
        return {
          action: true,
          message: `User #${userId} successfully joined the group${group.id}`,
        };
      }
    }
    return {
      action: false,
      message: 'The group does not exist or the activation code expires',
    };
  }

  async getGroupInviteCode(
    groupId: string,
    userId: string,
    activeStatus = true,
  ): Promise<ReturnData> {
    const member = await this.memberRepository.findOneBy({ groupId, userId });
    if (member) {
      const group = await this.groupRepository.findOneBy({
        id: groupId,
        activeStatus,
      });
      if (group) {
        const inviteCode = (await this.checkInviteCodeTime(group)).inviteCode;
        return {
          data: { inviteCode },
          action: true,
          message: 'Request data succeeded',
        };
      }
      throw new BadRequestException(`Group #${groupId} does not exist`);
    }
    throw new BadRequestException(
      `User #${userId} does not belong to this group`,
    );
  }

  async findGroupByOwner(
    owner: string,
    activeStatus = true,
  ): Promise<ReturnData> {
    const groups = await this.groupRepository.find({
      select: ['id', 'icon', 'name', 'owner', 'createTime', 'activeStatus'],
      where: { owner, activeStatus },
      relations: ['member'],
    });
    const data = groups ? groups : [];
    return { data, action: true, message: 'Request data succeeded' };
  }

  async findGroupByUserId(userId: string): Promise<ReturnData> {
    const data = await this.memberRepository
      .createQueryBuilder('member')
      .innerJoinAndSelect(
        'member.group',
        'group',
        'group.activeStatus = :activeStatus',
        {
          activeStatus: true,
        },
      )
      .where({ userId })
      .getMany();
    return { data, action: true, message: 'Request data succeeded' };
  }

  async findGroupByGroupId(
    groupId: string,
    userId: string,
    activeStatus = true,
  ): Promise<ReturnData> {
    const member = await this.memberRepository.findOneBy({ userId, groupId });
    if (!member) {
      throw new BadRequestException(
        `User #${userId} does not belong to this group`,
      );
    }
    const data = await this.groupRepository.findOne({
      select: ['id', 'icon', 'name', 'owner', 'createTime', 'activeStatus'],
      where: { id: groupId, activeStatus },
    });
    if (!data) {
      throw new BadRequestException(`The Group #${groupId} does not exist`);
    }
    return {
      data,
      action: true,
      message: 'Request data succeeded',
    };
  }

  async createGroup(
    owner: string,
    groupDto: CreateGroupDto,
    icon?: string,
  ): Promise<ReturnData> {
    const user = await this.userRepository.findOneBy({ id: owner });
    const name = user.username;
    const group = this.groupRepository.create({ user, ...groupDto, icon });
    const role = MemberRole.ADMIN;
    return this.groupRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(group);
        const member = { group, user, role, name };
        const entity = this.memberRepository.create(member);
        await transactionalEntityManager.save(entity);
        return {
          action: true,
          message: `Group #${group.id} created successfully`,
        };
      },
    );
  }

  async deleteGroup(id: string, owner: string): Promise<ReturnData> {
    await this.beforeAction(id, owner);
    const result = await this.groupRepository.preload({
      id,
      activeStatus: false,
    });
    const { name } = await this.groupRepository.save(result);
    return {
      action: true,
      message: `Group #${name} has been deleted`,
    };
  }

  async modifyGroup(
    groupDto: UpdateGroupDto,
    owner: string,
    icon?: string,
  ): Promise<ReturnData> {
    await this.beforeAction(groupDto.id, owner);
    const user = await this.userRepository.findOneBy({ id: groupDto.owner });
    if (!user) {
      throw new BadRequestException(`User #${groupDto.owner} does not exist`);
    }
    const result = await this.groupRepository.preload({ ...groupDto, icon });
    await this.groupRepository.save(result);
    return {
      action: true,
      message: 'Successfully updated group information',
    };
  }
}
