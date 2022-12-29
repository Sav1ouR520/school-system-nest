import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { WarpResponseInterceptor } from './common/interceptors/warp-response.interceptor';
import {
  ValidationInit,
  SwaggerInit,
  VersioningInit,
} from './config/app.config';
import { AppModule } from './module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(ValidationInit);
  app.setGlobalPrefix(process.env.APP_GLOBAL_PREFIX);
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new WarpResponseInterceptor());
  app.enableVersioning(VersioningInit);
  SwaggerInit(app);
  await app.listen(+process.env.APP_LISTEN_PORT);
}

bootstrap();
