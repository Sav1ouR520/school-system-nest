import { DataSource } from 'typeorm';
import { User } from '../entities';
import { Provider } from '@nestjs/common';

export const UserRepository: Provider = {
  inject: ['DATA_SOURCE'],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  provide: 'UserRepository',
};
