import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  AppEnvConfig,
  HttpExceptionFilter,
  SessionConfig,
  SwaggerInit,
  ValidationInit,
  VersioningInit,
  WarpResponseInterceptor,
} from './common';
import helmet from 'helmet';
import { join } from 'path';
import { ConfigType } from '@nestjs/config';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<ConfigType<typeof AppEnvConfig>>(AppEnvConfig.KEY);
  app.use(helmet());
  app.use(cookieParser());
  app.use(session(SessionConfig(config)));
  app.enableVersioning(VersioningInit(config));
  app.useGlobalPipes(ValidationInit);
  app.setGlobalPrefix(config.globalPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new WarpResponseInterceptor());
  app.useStaticAssets(join(__dirname, config.staticPath), {
    prefix: config.staticPath,
  });
  SwaggerInit(app, config);
  await app.listen(config.appListenPort);
}

bootstrap();
