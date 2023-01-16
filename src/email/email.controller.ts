import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/common';
import { EmailContext } from './types/EmailContext';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('email')
@ApiTags('EmailController')
@Public()
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  @ApiOperation({ summary: '发送邮箱[测试端口]', description: '发送邮箱' })
  @ApiBody({ type: EmailContext })
  async sendEmailCode(@Body() data: EmailContext) {
    return this.emailService.sendEmailCode(data);
  }
}
