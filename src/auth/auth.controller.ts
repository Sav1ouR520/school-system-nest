import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser, Public } from 'src/common';
import { RtGuard } from './guards';

@Controller('auth')
@ApiTags('AuthSerivce')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: '用户登录', description: '用户登录' })
  async login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post('logout')
  @ApiOperation({
    summary: '消除refreshToken',
    description: '消除refreshToken',
  })
  logout(@GetUser('uuid') uuid: string) {
    return this.authService.logout(uuid);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(
    @GetUser('uuid') uuid: string,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(uuid, refreshToken);
  }
}
