import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Message } from '../entities';

export const MessageRepository: Provider = {
  inject: ['DATA_SOURCE'],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Message),
  provide: 'MessageRepository',
};
