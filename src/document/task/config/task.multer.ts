import { ConfigType } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { PathConfig } from 'src/common';
import { TaskConfig } from './task.config';
import { nanoid } from 'nanoid';

export const TaskMulter = MulterModule.registerAsync({
  inject: [TaskConfig.KEY, PathConfig.KEY],
  useFactory: (
    config: ConfigType<typeof TaskConfig>,
    path: ConfigType<typeof PathConfig>,
  ) => ({
    fileFilter(_, file, callback) {
      const fileType = file.mimetype.split('/')[1];
      fileType == 'zip' ? callback(null, true) : callback(null, false);
    },
    storage: diskStorage({
      destination: join(path.rootPath, config.taskUploadPath),
      filename: (_, file, callback) => {
        const fileName = nanoid() + '.' + file.mimetype.split('/')[1];
        return callback(null, fileName);
      },
    }),
  }),
});
