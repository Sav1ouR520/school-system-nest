import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { MemberModule } from './member/member.module';
import { TaskModule } from './task/task.module';
import { FileModule } from './file/file.module';
import { MessageModule } from './message/message.module';
@Module({
  imports: [GroupModule, MemberModule, TaskModule, FileModule, MessageModule],
})
export class DocumentModule {}
