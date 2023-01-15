import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Member } from '../entities';

export const MemberRepository: Provider = {
  inject: ['DATA_SOURCE'],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Member),
  provide: 'MemberRepository',
};
