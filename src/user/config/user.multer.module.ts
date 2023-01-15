import { ConfigType } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserConfig } from './user.config';
import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { PathConfig } from 'src/common';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [UserConfig.KEY, PathConfig.KEY],
      useFactory: (
        config: ConfigType<typeof UserConfig>,
        path: ConfigType<typeof PathConfig>,
      ) => ({
        fileFilter(_, file, callback) {
          const fileType = file.mimetype.split('/')[0];
          fileType == 'image' ? callback(null, true) : callback(null, false);
        },
        storage: diskStorage({
          destination: path.rootPath + config.userIconPath,
          filename: (_, file, callback) => {
            const fileName = new Date().getTime() + extname(file.originalname);
            return callback(null, fileName);
          },
        }),
      }),
    }),
  ],
})
export class UserMulterModule {}
