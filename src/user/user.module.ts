import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin.controller';
import { UserRepository } from './providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserConfig, UserMulterModule } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [UserConfig] }),
    UserMulterModule,
  ],
  controllers: [UserController, AdminController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
