import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskConfig, TaskMulterModule } from './config';
import { RepositoryModule } from 'src/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [TaskConfig] }),
    TaskMulterModule,
    RepositoryModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
