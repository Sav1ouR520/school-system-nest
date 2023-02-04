import { registerAs } from '@nestjs/config';
import { fromEnvGetValue } from 'src/common';

export const GroupConfig = registerAs('GroupConfig', () => ({
  groupIconPath: fromEnvGetValue('GROUP_ICON_PATH'),
}));
