import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailContext } from './dto/email.context';
import * as moment from 'moment';
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmailCode(data: EmailContext) {
    const sendMailOptions: ISendMailOptions = {
      to: data.to,
      subject: data.subject,
      template: './validate.code.ejs',
      context: {
        mession: data.mission,
        code: data.code,
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    };
    await this.mailerService.sendMail(sendMailOptions);
    return { message: '发送成功' };
  }
}
