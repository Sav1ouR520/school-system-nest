import { registerAs } from '@nestjs/config';
import { fromEnvGetValue } from '../uitls';

export const AppEnvConfig = registerAs('EnvConfig', () => ({
  defaultVersion: fromEnvGetValue('APP_DEFAULT_VERSION'),
  globalPrefix: fromEnvGetValue('APP_GLOBAL_PREFIX'),
  appListenPort: +fromEnvGetValue('APP_LISTEN_PORT'),
  staticPath: fromEnvGetValue('STATIC_PATH'),
  prefix: fromEnvGetValue('STATIC_PREFIX'),
  sessionSecret: fromEnvGetValue('SESSION_SECRET'),
}));
