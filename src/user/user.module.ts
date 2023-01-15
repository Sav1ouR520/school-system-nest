import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserConfig } from './config/user.config';
import { AdminController } from './admin.controller';
import { StatusGuard } from 'src/common';
import { APP_GUARD } from '@nestjs/core';
import { UserRepository } from './providers/user.repository';
import { UserMulterModule } from './config/user.multer.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [UserConfig] }),
    UserMulterModule,
  ],
  controllers: [UserController, AdminController],
  providers: [
    UserRepository,
    UserService,
    { provide: APP_GUARD, useClass: StatusGuard },
  ],
})
export class UserModule {}
