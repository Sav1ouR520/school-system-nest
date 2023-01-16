import { registerAs } from '@nestjs/config';
import { fromEnvGetValue } from 'src/common';

export const EmailConfig = registerAs('EmailConfig', () => ({
  host: fromEnvGetValue('EMAIL_HOST'),
  port: +fromEnvGetValue('EMAIL_PORT'),
  ignoreTLS: Boolean(fromEnvGetValue('EMAIL_IGNORETLS')),
  secure: Boolean(fromEnvGetValue('EMAIL_SECURE')),
  auth: {
    user: fromEnvGetValue('EMAIL_ACCOUNT'),
    pass: fromEnvGetValue('EMAIL_PASSWORD'),
  },
}));
