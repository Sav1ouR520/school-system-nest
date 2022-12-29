import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import type { Algorithm } from 'jsonwebtoken';

export const DatabaseConfig = registerAs('DatabaseConfig', () => ({
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  retryDelay: +process.env.RETRY_DELAY,
  retryAttempts: +process.env.RETRY_ATTEMPTS,
  synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
  autoLoadEntities: Boolean(process.env.DATABASE_AUTO_LOAD_ENTITIES),
}));

export const JWTConfig = registerAs(
  'JwtConfig',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECERT,
    signOptions: {
      algorithm: process.env.JWT_ALGORITHM as Algorithm,
      expiresIn: process.env.JWT_EXPIRESIN,
    },
  }),
);

export const SwaggerConfig = registerAs('SwaggerConfig', () => ({
  title: process.env.SWAGGER_UI_TITLE,
  description: process.env.SWAGGER_UI_TITLE_DESCRIPTION,
  version: process.env.SWAGGER_API_VERSION,
  setupUrl: process.env.SWAGGER_SETUP_PATH,
}));
