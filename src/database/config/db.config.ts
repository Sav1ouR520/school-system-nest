import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getValue } from '../../config';

export const dbConfig = registerAs(
  'dbConfig',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: getValue('DATABASE_HOST'),
    port: +getValue('DATABASE_PORT'),
    username: getValue('DATABASE_USERNAME'),
    password: getValue('DATABASE_PASSWORD'),
    database: getValue('DATABASE_NAME'),
    retryDelay: +getValue('DATABASE_RETRY_DELAY'),
    retryAttempts: +getValue('DATABASE_RETRY_ATTEMPTS'),
    synchronize: Boolean(getValue('DATABASE_SYNCHRONIZE')),
    autoLoadEntities: Boolean(getValue('DATABASE_AUTO_LOAD_ENTITIES')),
  }),
);
