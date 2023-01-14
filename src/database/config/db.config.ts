import { registerAs } from '@nestjs/config';
import { fromEnvGetValue } from 'src/common';

export const dbConfig = registerAs(
  fromEnvGetValue('DATABASE_PROVIDER'),
  () => ({
    host: fromEnvGetValue('DATABASE_HOST'),
    port: +fromEnvGetValue('DATABASE_PORT'),
    username: fromEnvGetValue('DATABASE_USERNAME'),
    password: fromEnvGetValue('DATABASE_PASSWORD'),
    database: fromEnvGetValue('DATABASE_NAME'),
    synchronize: Boolean(fromEnvGetValue('DATABASE_SYNCHRONIZE')),
  }),
);
