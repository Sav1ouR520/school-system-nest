import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PostgresModule } from './common/module/postgres.module';
import { loadConfig } from './config/config.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
    }),
    UserModule,
    JwtModule,
    PostgresModule,
  ],
})
export class AppModule {}
