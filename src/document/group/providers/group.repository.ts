import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common';
import { Group } from '../entities';

export const GroupRepository: Provider = {
  inject: ['DATA_SOURCE'],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Group),
  provide: 'GroupRepository',
};
