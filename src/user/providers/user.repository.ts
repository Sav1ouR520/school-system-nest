import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Provider } from '@nestjs/common';

export const UserRepository: Provider = {
  inject: ['DATA_SOURCE'],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  provide: 'UserRepository',
};
