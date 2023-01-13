import { registerAs } from '@nestjs/config';
import { fromEnvGetValue } from 'src/common';

export const FileConfig = registerAs('FileConfig', () => ({
  fileUploadPath: fromEnvGetValue('FILE_UPLOAD_PATH'),
}));
