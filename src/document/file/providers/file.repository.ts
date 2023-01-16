import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { File } from '../entities';

export const FileRepository: Provider = {
  inject: ['DATA_SOURCE'],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(File),
  provide: 'FileRepository',
};
