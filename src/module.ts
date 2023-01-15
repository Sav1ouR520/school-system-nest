import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppEnvConfig, PathConfig } from './common';
import { UserModule } from './user/user.module';
import { CaptchaController, IndexController } from './common/controller';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { PostgresModule } from './database/postgres.module';

@Module({
  imports: [
    PostgresModule,
    UserModule,
    AuthModule,
    DocumentModule,
    ConfigModule.forRoot({ isGlobal: true, load: [AppEnvConfig, PathConfig] }),
  ],
  providers: [],
  controllers: [CaptchaController, IndexController],
})
export class AppModule {}
