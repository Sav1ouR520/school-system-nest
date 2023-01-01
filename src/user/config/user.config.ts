import { registerAs } from '@nestjs/config';
import { fromEnvGetValue } from 'src/common';

export const UserConfig = registerAs('UserConfig', () => ({
  userIconPath: fromEnvGetValue('USER_ICON_PATH'),
}));
