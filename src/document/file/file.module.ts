import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from 'src/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileConfig, FileMulterModule } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [FileConfig] }),
    FileMulterModule,
    RepositoryModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
