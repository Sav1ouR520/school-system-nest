import { registerAs } from '@nestjs/config';

export const PathConfig = registerAs('pathConfig', () => ({
  rootPath: __dirname + '/../../',
}));
