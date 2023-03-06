import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/common/providers';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JWTConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [JWTConfig] }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [RtStrategy, AtStrategy, AuthService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
