import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EmailConfig } from './email.config';
import { join } from 'path';
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [EmailConfig.KEY],
      useFactory: (config: ConfigType<typeof EmailConfig>) => ({
        transport: config,
        defaults: {
          from: `"${config.auth.user.split('@')[0]}" <${config.auth.user}>`,
        },
        preview: false,
        template: {
          dir: join(process.cwd(), './src/email/template'),
          adapter: new EjsAdapter(),
          options: { strict: true },
        },
      }),
    }),
  ],
})
export class MailerModifyModule {}
