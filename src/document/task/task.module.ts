import { Module } from '@nestjs/common';
import { TaskRepository } from './providers/task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ConfigModule } from '@nestjs/config';
import { TaskConfig } from './config/task.config';
import { TaskMulterModule } from './config/task.multer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [TaskConfig] }),
    TaskMulterModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
