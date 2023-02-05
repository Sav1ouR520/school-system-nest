import { ConfigType } from '@nestjs/config';
import { diskStorage } from 'multer';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { PathConfig } from 'src/common/config/path.config';
import { GroupConfig } from './group.config';
import { nanoid } from 'nanoid';

export const GroupMulter = MulterModule.registerAsync({
  inject: [GroupConfig.KEY, PathConfig.KEY],
  useFactory: (
    config: ConfigType<typeof GroupConfig>,
    path: ConfigType<typeof PathConfig>,
  ) => ({
    limits: { fileSize: 1024 * 1024 },
    fileFilter(_, file, callback) {
      const fileType = file.mimetype.split('/')[0];
      fileType == 'image' ? callback(null, true) : callback(null, false);
    },
    storage: diskStorage({
      destination: join(path.rootPath, config.groupIconPath),
      filename: (_, file, callback) => {
        const fileName = nanoid() + '.' + file.mimetype.split('/')[1];
        return callback(null, fileName);
      },
    }),
  }),
});
