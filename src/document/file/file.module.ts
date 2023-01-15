import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ConfigModule } from '@nestjs/config';
import { FileConfig } from './config/file.config';
import { FileMulterModule } from './config/file.multer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [FileConfig] }),
    FileMulterModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
