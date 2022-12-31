import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guards';
import { PostgresModule } from './database/postgres.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PostgresModule, UserModule, AuthModule],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}
