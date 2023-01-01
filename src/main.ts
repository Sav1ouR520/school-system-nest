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
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.use(helmet());
  app.useGlobalPipes(ValidationInit);
  app.setGlobalPrefix(config.get('APP_GLOBAL_PREFIX'));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new WarpResponseInterceptor());
  app.useStaticAssets(join(__dirname, config.get('USER_ICON_PATH')), {
    prefix: config.get('USER_ICON_PATH'),
  });
  SwaggerInit(app);
  await app.listen(+config.get('APP_LISTEN_PORT'));
}

bootstrap();
