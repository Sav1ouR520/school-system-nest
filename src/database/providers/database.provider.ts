import { ConfigType } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { dbConfig } from '../config/db.config';
import { Provider } from '@nestjs/common';

const { DATABASE_PROVIDER } = process.env;

export const DatabaseProvider: Provider = {
  provide: DATABASE_PROVIDER,
  inject: [dbConfig.KEY],
  useFactory: async (db: ConfigType<typeof dbConfig>) => {
    const dataSource = new DataSource({
      type: 'postgres',
      ...db,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    });
    return dataSource.initialize();
  },
};
