import { ConfigType } from '@nestjs/config';
import { diskStorage } from 'multer';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { PathConfig } from 'src/common/config/path.config';
import { FileConfig } from './file.config';
import { nanoid } from 'nanoid';

export const FileMulter = MulterModule.registerAsync({
  inject: [FileConfig.KEY, PathConfig.KEY],
  useFactory: (
    config: ConfigType<typeof FileConfig>,
    path: ConfigType<typeof PathConfig>,
  ) => ({
    fileFilter(_, file, callback) {
      const fileType = file.mimetype.split('/')[1];
      fileType == 'zip' ? callback(null, true) : callback(null, false);
    },
    storage: diskStorage({
      destination: join(path.rootPath, config.fileUploadPath),
      filename: (_, file, callback) => {
        const fileName = nanoid() + '.' + file.mimetype.split('/')[1];
        return callback(null, fileName);
      },
    }),
  }),
});
