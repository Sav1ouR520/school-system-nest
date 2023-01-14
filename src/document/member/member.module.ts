import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { GroupRepository } from '../group/providers/group.repository';
import { MemberService } from './member.service';
import { MemberRepository } from './providers/member.repository';
import { UserRepository } from 'src/user/providers/user.repository';

@Module({
  controllers: [MemberController],
  providers: [MemberService, MemberRepository, GroupRepository, UserRepository],
})
export class MemberModule {}
