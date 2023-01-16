import {
  INestApplication,
  ValidationPipe,
  VersioningOptions,
  VersioningType,
} from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import { AppEnvConfig } from './app.env.config';
import { ConfigType } from '@nestjs/config';
export const SwaggerInit = (
  app: INestApplication,
  config: ConfigType<typeof AppEnvConfig>,
) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('学校通')
    .setDescription('学校通后台管理系统')
    .setVersion(config.defaultVersion)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
};

export const ValidationInit = new ValidationPipe({
  whitelist: true,
  forbidUnknownValues: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
});

export const VersioningInit = (
  config: ConfigType<typeof AppEnvConfig>,
): VersioningOptions => ({
  defaultVersion: config.defaultVersion,
  type: VersioningType.URI,
});

export const SessionConfig = (
  config: ConfigType<typeof AppEnvConfig>,
): session.SessionOptions => ({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  name: 'connect.session',
  rolling: false,
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: 10 * 60 },
});
