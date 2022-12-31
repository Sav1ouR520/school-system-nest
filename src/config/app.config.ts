import {
  INestApplication,
  ValidationPipe,
  VersioningOptions,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const getValue = (key: string) => {
  const { env } = process;
  const value = env[key];
  if (!value) {
    throw new Error(`config error - missing env.${key}`);
  }
  return value;
};

const { env } = process;
export const SwaggerInit = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('学校通')
    .setDescription('学校通后台管理系统')
    .setVersion(env.APP_DEFAULT_VERSION)
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

export const VersioningInit: VersioningOptions = {
  defaultVersion: env.APP_DEFAULT_VERSION,
  type: VersioningType.URI,
};
