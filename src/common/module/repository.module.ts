import { Module } from '@nestjs/common';
import {
  FileRepository,
  GroupRepository,
  MemberRepository,
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
  ],
  exports: [
    GroupRepository,
    MemberRepository,
    TaskRepository,
    UserRepository,
    FileRepository,
  ],
})
export class RepositoryModule {}
