import { ConfigType } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { TaskConfig } from './task.config';
import { PathConfig } from 'src/common/config/path.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [TaskConfig.KEY, PathConfig.KEY],
      useFactory: (
        config: ConfigType<typeof TaskConfig>,
        path: ConfigType<typeof PathConfig>,
      ) => ({
        fileFilter(_, file, callback) {
          callback(null, true);
        },
        storage: diskStorage({
          destination: path.rootPath + config.taskUploadPath,
          filename: (_, file, callback) => {
            const fileName = new Date().getTime() + extname(file.originalname);
            return callback(null, fileName);
          },
        }),
      }),
    }),
  ],
})
export class TaskMulterModule {}
