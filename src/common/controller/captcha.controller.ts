import { Controller, Get, Res, Session } from '@nestjs/common';
import { Public } from '../decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as svgCaptcha from 'svg-captcha';

@Public()
@Controller('captcha')
@ApiTags('CaptchaController')
export class CaptchaController {
  @Get()
  @ApiOperation({ summary: '验证码', description: '验证码生成' })
  createCaptcha(@Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#9CA3AF',
    });
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
}
