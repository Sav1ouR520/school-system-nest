import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Group, User } from 'src/common';
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
