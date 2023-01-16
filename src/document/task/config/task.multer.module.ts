import { ConfigType } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { PathConfig } from 'src/common';
import { TaskConfig } from './task.config';

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
          destination: join(path.rootPath, config.taskUploadPath),
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
