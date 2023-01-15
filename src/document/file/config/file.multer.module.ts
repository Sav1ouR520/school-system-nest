import { ConfigType } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { PathConfig } from 'src/common/config/path.config';
import { FileConfig } from './file.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [FileConfig.KEY, PathConfig.KEY],
      useFactory: (
        config: ConfigType<typeof FileConfig>,
        path: ConfigType<typeof PathConfig>,
      ) => ({
        fileFilter(_, file, callback) {
          callback(null, true);
        },
        storage: diskStorage({
          destination: path.rootPath + config.fileUploadPath,
          filename: (_, file, callback) => {
            const fileName = new Date().getTime() + extname(file.originalname);
            return callback(null, fileName);
          },
        }),
      }),
    }),
  ],
})
export class FileMulterModule {}
