import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from 'src/auth/config/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { UserRepository } from 'src/user/providers/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [JWTConfig] }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [RtStrategy, AtStrategy, AuthService, UserRepository],
})
export class AuthModule {}
