import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupRepository } from './providers/group.repository';
import { UserRepository } from 'src/user/providers/user.repository';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, UserRepository],
})
export class GroupModule {}
