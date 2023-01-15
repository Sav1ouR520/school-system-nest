import { Module } from '@nestjs/common';
import {
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
  ],
  exports: [GroupRepository, MemberRepository, TaskRepository, UserRepository],
})
export class RepositoryModule {}
