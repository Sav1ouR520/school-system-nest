import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Task } from '../entities/task.entity';

export const TaskRepository: Provider = {
  inject: ['DATA_SOURCE'],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
  provide: 'TaskRepository',
};
