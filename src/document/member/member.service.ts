import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { Group } from '../group/entities/group.entity';
import { CreateMemberDto, UploadMemberDto, deleteMemberDto } from './dto';
import { User } from 'src/user/entities/user.entity';

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

  async findGroupByUserId(userId: string) {
    const data = await this.memberRepository.find({
      where: { userId },
      relations: ['group'],
    });
    return { data, message: 'Request data succeeded' };
  }

  async addMember(memberDto: CreateMemberDto) {
    const { groupId } = memberDto;
    const members: Member[] = [];
    const group = await this.groupRepository.findOneBy({ id: groupId });
    for (const member of memberDto.members) {
      const user = await this.userRepository.findOneBy({ id: member.userId });
      const entity = this.memberRepository.create({
        group,
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
    return { message: 'Member added successfully' };
  }

  async deleteMember(memberDto: deleteMemberDto) {
    const { groupId } = memberDto;
    const members: Member[] = [];
    for (const member of memberDto.members) {
      const { id, userId } = member;
      const entity = await this.memberRepository.findOneBy({
        id,
        groupId,
        userId,
      });
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
    return { message: 'Member deleted successfully' };
  }

  async modifyMember(memberDto: UploadMemberDto) {
    const { groupId } = memberDto;
    const members: Member[] = [];
    for (const member of memberDto.members) {
      const { id, userId, role, name } = member;
      const entity = await this.memberRepository.findOneBy({
        id,
        groupId,
        userId,
      });
      if (!entity) {
        throw new BadRequestException('Entity does not exist');
      }
      role ? (entity.role = role) : '';
      name ? (entity.name = name) : '';
      members.push(entity);
    }
    await this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(members);
      },
    );
    return { message: 'Member deleted successfully' };
  }
}
