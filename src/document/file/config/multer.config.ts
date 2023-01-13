import { ConfigType } from '@nestjs/config';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { FileConfig } from './file.config';

export const fileConfig = (
  config: ConfigType<typeof FileConfig>,
): Promise<MulterModuleOptions> | MulterModuleOptions => ({
  fileFilter(_, file, callback) {
    callback(null, true);
  },
  storage: diskStorage({
    destination: join(__dirname, '../' + config.fileUploadPath),
    filename: (_, file, callback) => {
      const fileName = new Date().getTime() + extname(file.originalname);
      return callback(null, fileName);
    },
  }),
});
