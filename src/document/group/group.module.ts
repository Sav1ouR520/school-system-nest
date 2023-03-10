import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { RepositoryModule } from 'src/common';
import { ConfigModule } from '@nestjs/config';
import { GroupConfig, GroupMulter } from './config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [GroupConfig] }),
    GroupMulter,
    RepositoryModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
