import { ConfigType } from '@nestjs/config';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { UserConfig } from './user.config';
import { MulterModuleOptions } from '@nestjs/platform-express';

export const fileConfig = (
  config: ConfigType<typeof UserConfig>,
): Promise<MulterModuleOptions> | MulterModuleOptions => ({
  fileFilter(_, file, callback) {
    const fileType = file.mimetype.split('/')[0];
    fileType == 'image' ? callback(null, true) : callback(null, false);
  },
  storage: diskStorage({
    destination: join(__dirname, '../' + config.userIconPath),
    filename: (_, file, callback) => {
      const fileName = new Date().getTime() + extname(file.originalname);
      return callback(null, fileName);
    },
  }),
});
