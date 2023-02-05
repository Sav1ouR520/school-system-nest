import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from 'src/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileConfig, FileMulter } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [FileConfig] }),
    FileMulter,
    RepositoryModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
