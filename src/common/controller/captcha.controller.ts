import { Controller, Get, Res, Session } from '@nestjs/common';
import { Public } from '../decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as svgCaptcha from 'svg-captcha';
import { Response } from 'express';

@Public()
@Controller('captcha')
@ApiTags('CaptchaController')
export class CaptchaController {
  @Get()
  @ApiOperation({ summary: '验证码', description: '验证码生成' })
  createCaptcha(@Res() res: Response, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#9CA3AF',
    });
    session.code = captcha.text;
    console.log(session);
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
}
