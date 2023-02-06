import { Module } from '@nestjs/common';
import {
  FileRepository,
  GroupRepository,
  MemberRepository,
  MessageRepository,
  TaskRepository,
  UserRepository,
} from '../providers';

@Module({
  providers: [
    GroupRepository,
    MemberRepository,
    TaskRepository,
    UserRepository,
    FileRepository,
    MessageRepository,
  ],
  exports: [
    GroupRepository,
    MemberRepository,
    TaskRepository,
    UserRepository,
    FileRepository,
    MessageRepository,
  ],
})
export class RepositoryModule {}
