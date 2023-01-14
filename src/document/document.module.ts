import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { MemberModule } from './member/member.module';
import { TaskModule } from './task/task.module';
@Module({
  imports: [GroupModule, MemberModule, TaskModule],
})
export class DocumentModule {}
