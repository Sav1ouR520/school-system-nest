import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { WarpResponseInterceptor } from './common/interceptors/warp-response.interceptor';
import { ValidationInit, SwaggerInit, VersioningInit } from './config';
import { AppModule } from './module';

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
