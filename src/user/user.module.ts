import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserConfig } from './config/user.config';
import { AdminController } from './admin.controller';
import { fileConfig } from './config/multer.config';
import { StatusGuard } from 'src/common';
import { APP_GUARD } from '@nestjs/core';
import { UserRepository } from './providers/user.repository';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [UserConfig] }),
    MulterModule.registerAsync({
      inject: [UserConfig.KEY],
      useFactory: (config: ConfigType<typeof UserConfig>) => fileConfig(config),
    }),
  ],
  controllers: [UserController, AdminController],
  providers: [
    UserRepository,
    UserService,
    { provide: APP_GUARD, useClass: StatusGuard },
  ],
})
export class UserModule {}
