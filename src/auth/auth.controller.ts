import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user';
import { Decrypt, GetUser, Public, captchaValidate } from 'src/common';
import { RtGuard } from './guards';

@Controller('auth')
@ApiTags('AuthController')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: '用户登录', description: '用户登录' })
  async login(@Session() session, @Body() userDto: LoginUserDto) {
    if (session.code) {
      const result = captchaValidate(session.code, userDto.captcha);
      if (!result.data.validation) {
        return result;
      }
      const password = Decrypt(userDto.password, session.key, session.iv);
      return this.authService.login({ ...userDto, password });
    }
    throw new BadRequestException('Error Session');
  }

  @Post('logout')
  @ApiOperation({
    summary: '消除refreshToken',
    description: '消除refreshToken',
  })
  logout(@GetUser('id') id: string) {
    return this.authService.logout(id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(
    @GetUser('id') id: string,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(id, refreshToken);
  }
}
