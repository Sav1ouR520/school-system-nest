import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import {
  HttpExceptionFilter,
  SwaggerInit,
  ValidationInit,
  VersioningInit,
  WarpResponseInterceptor,
} from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { env } = process;
  app.useGlobalPipes(ValidationInit);
  app.setGlobalPrefix(env.APP_GLOBAL_PREFIX);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new WarpResponseInterceptor());
  app.enableVersioning(VersioningInit);
  SwaggerInit(app);
  await app.listen(+env.APP_LISTEN_PORT);
}

bootstrap();
