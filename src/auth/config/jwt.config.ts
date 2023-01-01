import { registerAs } from '@nestjs/config';
import { fromEnvGetValue } from 'src/common';

export const JWTConfig = registerAs('JWTConfig', () => ({
  acceptTokens: {
    secret: fromEnvGetValue('JWT_ACCEPT_SECRET'),
    expiresIn: +fromEnvGetValue('JWT_ACCEPT_EXPIRESIN'),
  },
  refreshToken: {
    secret: fromEnvGetValue('JWT_REFRESH_SECRET'),
    expiresIn: +fromEnvGetValue('JWT_REFRESH_EXPIRESIN'),
  },
}));
