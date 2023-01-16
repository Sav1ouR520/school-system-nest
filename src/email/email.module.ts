import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailConfig, MailerModifyModule } from './config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [EmailConfig] }),
    MailerModifyModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
