import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UserRepository } from 'src/common/providers';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JWTConfig } from './config';
import { AtGuard } from './guards';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [JWTConfig] }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    { provide: APP_GUARD, useClass: AtGuard },
    RtStrategy,
    AtStrategy,
    AuthService,
    UserRepository,
  ],
})
export class AuthModule {}
