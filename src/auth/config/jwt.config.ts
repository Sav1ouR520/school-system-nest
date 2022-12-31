import { registerAs } from '@nestjs/config';
import { getValue } from 'src/common';

export const JWTConfig = registerAs('JWTConfig', () => ({
  acceptTokens: {
    secret: getValue('JWT_ACCEPT_SECRET'),
    expiresIn: +getValue('JWT_ACCEPT_EXPIRESIN'),
  },
  refreshToken: {
    secret: getValue('JWT_REFRESH_SECRET'),
    expiresIn: +getValue('JWT_REFRESH_EXPIRESIN'),
  },
}));
