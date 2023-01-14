import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { User } from 'src/user/entities/user.entity';
import { Member } from '../member/entities/member.entity';
import { MemberRole } from '../member/enum/memberRole';

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

  async createGroup(owner: string, groupDto: CreateGroupDto) {
    const user = await this.userRepository.findOneBy({ id: owner });
    const name = user.username;
    const group = this.groupRepository.create({ user, ...groupDto });
    const role = MemberRole.ADMIN;
    return this.groupRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(group);
        const member = { group, user, role, name };
        const entity = this.memberRepository.create(member);
        await transactionalEntityManager.save(entity);
        return { message: `Group #${group.name} created successfully` };
      },
    );
  }

  async deleteGroup(id: string, owner: string, activeStatue = true) {
    const group = await this.groupRepository.findOneBy({
      id,
      owner,
      activeStatue,
    });
    if (!group) {
      throw new BadRequestException(
        `The group #${id} does not belong to this user #${owner}`,
      );
    }
    const result = await this.groupRepository.preload({
      id,
      activeStatue: false,
    });
    this.groupRepository.save(result);
    return { message: 'Group has been deleted' };
  }

  async changeGroup(
    groupDto: UpdateGroupDto,
    owner: string,
    activeStatue = true,
  ) {
    const { id } = groupDto;
    const group = await this.groupRepository.findOneBy({
      id,
      owner,
      activeStatue,
    });
    if (!group) {
      throw new BadRequestException(
        `The group #${id} does not belong to this user #${owner}`,
      );
    }
    const user = await this.userRepository.findOneBy({ id: groupDto.owner });
    if (!user) {
      throw new BadRequestException(`User #${id} does not exist`);
    }
    const result = await this.groupRepository.preload(groupDto);
    this.groupRepository.save(result);
    return { message: 'Successfully updated group information' };
  }
}
