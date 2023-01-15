import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guards';
import { UserModule } from './user/user.module';
import { CaptchaController, IndexController } from './common/controller';
import { AppEnvConfig } from './common';
import { DocumentModule } from './document/document.module';
import { PostgresModule } from './database/postgres.module';
import { PathConfig } from './common/config/path.config';

@Module({
  imports: [
    PostgresModule,
    UserModule,
    AuthModule,
    DocumentModule,
    ConfigModule.forRoot({ isGlobal: true, load: [AppEnvConfig, PathConfig] }),
  ],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
  controllers: [CaptchaController, IndexController],
})
export class AppModule {}
