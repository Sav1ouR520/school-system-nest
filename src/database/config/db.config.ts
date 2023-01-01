import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { fromEnvGetValue } from 'src/common';

export const dbConfig = registerAs(
  'dbConfig',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: fromEnvGetValue('DATABASE_HOST'),
    port: +fromEnvGetValue('DATABASE_PORT'),
    username: fromEnvGetValue('DATABASE_USERNAME'),
    password: fromEnvGetValue('DATABASE_PASSWORD'),
    database: fromEnvGetValue('DATABASE_NAME'),
    retryDelay: +fromEnvGetValue('DATABASE_RETRY_DELAY'),
    retryAttempts: +fromEnvGetValue('DATABASE_RETRY_ATTEMPTS'),
    synchronize: Boolean(fromEnvGetValue('DATABASE_SYNCHRONIZE')),
    autoLoadEntities: Boolean(fromEnvGetValue('DATABASE_AUTO_LOAD_ENTITIES')),
  }),
);
