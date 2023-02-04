import { ConfigType } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { PathConfig } from 'src/common/config/path.config';
import { GroupConfig } from './group.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [GroupConfig.KEY, PathConfig.KEY],
      useFactory: (
        config: ConfigType<typeof GroupConfig>,
        path: ConfigType<typeof PathConfig>,
      ) => ({
        fileFilter(_, file, callback) {
          callback(null, true);
        },
        storage: diskStorage({
          destination: join(path.rootPath, config.groupIconPath),
          filename: (_, file, callback) => {
            const fileName = new Date().getTime() + extname(file.originalname);
            return callback(null, fileName);
          },
        }),
      }),
    }),
  ],
})
export class GroupMulterModule {}
