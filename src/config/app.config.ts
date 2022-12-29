import {
  INestApplication,
  ValidationPipe,
  VersioningOptions,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const { env } = process;
export const SwaggerInit = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(env.SWAGGER_UI_TITLE)
    .setDescription(env.SWAGGER_UI_TITLE_DESCRIPTION)
    .setVersion(env.APP_DEFAULT_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(env.SWAGGER_SETUP_URL, app, document);
};

export const ValidationInit = new ValidationPipe({
  whitelist: true,
  forbidUnknownValues: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
});

export const VersioningInit: VersioningOptions = {
  defaultVersion: '1',
  type: VersioningType.URI,
};
