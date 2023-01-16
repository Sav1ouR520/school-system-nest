import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppEnvConfig, PathConfig, StatusGuard } from './common';
import { UserModule } from './user/user.module';
import { CaptchaController, IndexController } from './common/controller';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { PostgresModule } from './database/postgres.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    PostgresModule,
    UserModule,
    AuthModule,
    DocumentModule,
    EmailModule,
    ConfigModule.forRoot({ isGlobal: true, load: [AppEnvConfig, PathConfig] }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: AtGuard },
    { provide: APP_GUARD, useClass: StatusGuard },
  ],
  controllers: [CaptchaController, IndexController],
})
export class AppModule {}
