import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailContext } from './dto/email.context';
import * as moment from 'moment';
import { ReturnData } from 'src/common';
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmailCode(data: EmailContext): Promise<ReturnData> {
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
    return { action: true, message: '发送成功' };
  }
}
