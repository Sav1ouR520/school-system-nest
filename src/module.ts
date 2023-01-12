import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guards';
import { PostgresModule } from './database/postgres.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CaptchaController, IndexController } from './common/controller';
import { AppEnvConfig } from './common';

@Module({
  imports: [
    PostgresModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [AppEnvConfig] }),
  ],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
  controllers: [CaptchaController, IndexController],
})
export class AppModule {}
