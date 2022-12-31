import { registerAs } from '@nestjs/config';
import { getValue } from '../../config/app.config';

export const JWTConfig = registerAs('jwtConfig', () => ({
  acceptTokens: {
    secret: getValue('JWT_ACCEPT_SECRET'),
    expiresIn: getValue('JWT_ACCEPT_EXPIRESIN'),
  },
  refreshToken: {
    secret: getValue('JWT_REFRESH_SECRET'),
    expiresIn: getValue('JWT_REFRESH_EXPIRESIN'),
  },
}));
