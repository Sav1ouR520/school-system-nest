import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';
import type { Algorithm } from 'jsonwebtoken';
export const loadConfig = () => {
  const getValue = (key: string) => {
    const { env } = process;
    const value = env[key];
    if (!value) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  };

  const JWTConfig: JwtModuleOptions = {
    secret: getValue('JWT_SECERTKEY'),
    signOptions: {
      algorithm: getValue('JWT_ALGORITHM') as Algorithm,
      expiresIn: getValue('JWT_EXPIRESIN'),
    },
  };

  const TypeOrmConfig: TypeOrmModuleOptions = {
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
  };

  return { JWTConfig, TypeOrmConfig };
};
