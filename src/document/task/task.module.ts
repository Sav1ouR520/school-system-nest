import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskConfig, TaskMulter } from './config';
import { RepositoryModule } from 'src/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [TaskConfig] }),
    TaskMulter,
    RepositoryModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
