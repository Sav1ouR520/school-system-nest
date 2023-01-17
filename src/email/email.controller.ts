import { Body, Controller, Post, Req, Res, Session } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/common';
import { EmailContext } from './dto/email.context';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailDto } from './dto';
import { Response } from 'express';
import * as moment from 'moment';

@Controller('email')
@ApiTags('EmailController')
@Public()
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  @ApiOperation({ summary: '发送邮箱验证码', description: '发送邮箱验证码' })
  async sendCode(
    @Req() req,
    @Res() res: Response,
    @Session() session,
    @Body() emailDto: EmailDto,
  ) {
    const reqTime = req.cookies.nextTime;
    if (!reqTime || moment(reqTime).diff(new Date()) <= 0) {
      const data = new EmailContext();
      session.email = data.to = emailDto.to;
      data.subject = data.mission = '邮箱验证';
      session.emailcode = data.code = `${Math.floor(
        Math.random() * 4000 + 1000,
      )}`;
      const nextTime = moment().add(1, 'minutes');
      res.cookie('nextTime', nextTime);
      await this.emailService.sendEmailCode(data);
    }
    res.send('ok');
  }
}
