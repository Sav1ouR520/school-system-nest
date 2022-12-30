import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './common/module/postgres.module';
import { loadConfig } from './config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
    }),
    UserModule,
    PostgresModule,
  ],
})
export class AppModule {}
