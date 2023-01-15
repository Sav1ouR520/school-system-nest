import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { RepositoryModule } from 'src/common';
@Module({
  imports: [RepositoryModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
