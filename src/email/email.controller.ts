import { Body, Controller, Param, Post, Session } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/common';
import { EmailContext } from './dto/EmailContext';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('email')
@ApiTags('EmailController')
@Public()
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post(':email')
  @ApiOperation({ summary: '发送邮箱验证码', description: '发送邮箱验证码' })
  sendCode(@Session() session, @Param('email') email: string) {
    const data = new EmailContext();
    data.to = email;
    data.subject = data.mission = '邮箱验证';
    data.code = session.emailcode = '1111';
    return this.emailService.sendEmailCode(data);
  }
}
