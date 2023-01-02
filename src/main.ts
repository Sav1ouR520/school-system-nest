import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  HttpExceptionFilter,
  SwaggerInit,
  ValidationInit,
  WarpResponseInterceptor,
} from './common';
import helmet from 'helmet';
import { join } from 'path';
import { ConfigType } from '@nestjs/config';
import { AppEnvConfig } from './common/config/app.env.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<ConfigType<typeof AppEnvConfig>>(AppEnvConfig.KEY);
  app.use(helmet());
  app.useGlobalPipes(ValidationInit);
  app.setGlobalPrefix(config.globalPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new WarpResponseInterceptor());
  app.useStaticAssets(join(__dirname, config.userIconPath), {
    prefix: config.userIconPath,
  });
  SwaggerInit(app);
  await app.listen(config.appListenPort);
}

bootstrap();
