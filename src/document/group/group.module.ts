import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupRepository } from './providers/group.repository';
import { UserRepository } from 'src/user/providers/user.repository';
import { MemberRepository } from '../member/providers/member.repository';
@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, MemberRepository, UserRepository],
})
export class GroupModule {}
