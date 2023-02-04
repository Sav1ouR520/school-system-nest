import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { MemberRole } from '../member/enum';
import { Member, User } from 'src/common';
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

  async findGroupByOwner(owner: string, activeStatue = true) {
    const groups = await this.groupRepository.find({
      where: { owner, activeStatue },
      relations: ['member'],
    });
    const data = groups ? groups : [];
    return { data, message: 'Request data succeeded' };
  }

  async findGroupByUserId(userId: string) {
    const data = await this.memberRepository.find({
      where: { userId },
      relations: ['group'],
    });
    return { data, message: 'Request data succeeded' };
  }

  async createGroup(owner: string, groupDto: CreateGroupDto, icon?: string) {
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
        return { message: `Group #${group.id} created successfully` };
      },
    );
  }

  async deleteGroup(id: string, owner: string) {
    await this.beforeAction(id, owner);
    const result = await this.groupRepository.preload({
      id,
      activeStatue: false,
    });
    const { name } = await this.groupRepository.save(result);
    return { message: `Group #${name} has been deleted` };
  }

  async changeGroup(groupDto: UpdateGroupDto, owner: string) {
    await this.beforeAction(groupDto.id, owner);
    const user = await this.userRepository.findOneBy({ id: groupDto.owner });
    if (!user) {
      throw new BadRequestException(`User #${groupDto.owner} does not exist`);
    }
    const result = await this.groupRepository.preload(groupDto);
    this.groupRepository.save(result);
    return { message: 'Successfully updated group information' };
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
