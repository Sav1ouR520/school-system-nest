import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostgresModule } from './database/postgres.module';
import { UserModule } from './user/user.module';

@Module({ imports: [PostgresModule, UserModule, AuthModule] })
export class AppModule {}
