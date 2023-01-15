import { registerAs } from '@nestjs/config';
import { fromEnvGetValue } from 'src/common';

export const TaskConfig = registerAs('TaskConfig', () => ({
  taskUploadPath: fromEnvGetValue('TASK_UPLOAD_PATH'),
}));
