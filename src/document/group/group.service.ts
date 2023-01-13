import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GroupService {
  constructor(
    @Inject('GroupRepository')
    private readonly groupRepository: Repository<Group>,
    @Inject('UserRepository')
    private readonly userRepository: Repository<User>,
  ) {}

  async findGroupByOwner(owner: string) {
    const data = await this.groupRepository.findBy({ owner });
    // this.userRepository.find({relations:})
    return { data, message: 'Request data succeeded' };
  }

  createGroup(owner: string, groupDto: CreateGroupDto) {
    const group = this.groupRepository.create({ owner, ...groupDto });
    this.groupRepository.save(group);
    return { message: `Group #${group.name} created successfully` };
  }

  async deleteGroup(id: string, owner: string) {
    const result = await this.groupRepository.delete({ id, owner });
    return result.affected === 1
      ? { message: 'Group has been deleted' }
      : { message: 'Failed to delete group' };
  }

  async changeGroup(groupDto: UpdateGroupDto, owner: string) {
    const { id } = groupDto;
    const group = await this.groupRepository.findOneBy({ id, owner });
    if (!group) {
      throw new BadRequestException(
        `The group #${id} does not belong to this user #${owner}`,
      );
    }
    const result = await this.groupRepository.preload(groupDto);
    this.groupRepository.save(result);
    return { message: 'Successfully updated group information' };
  }
}
