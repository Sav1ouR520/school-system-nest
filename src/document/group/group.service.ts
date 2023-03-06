import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { MemberRole } from '../member/enum';
import { Member, ReturnData, User } from 'src/common';
import { Group } from './entities';

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

  async findGroupByOwner(
    owner: string,
    activeStatus = true,
  ): Promise<ReturnData> {
    const groups = await this.groupRepository.find({
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
    id: string,
    activeStatus = true,
  ): Promise<ReturnData> {
    const data = await this.groupRepository.findOneBy({ id, activeStatus });
    if (!data) {
      throw new BadRequestException(`The Group #${id} does not exist`);
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

  async beforeAction(id: string, owner: string) {
    const group = await this.groupRepository.findOneBy({ id, owner });
    if (!group) {
      throw new BadRequestException(
        `The group #${id} does not belong to this user #${owner}`,
      );
    }
  }
}
