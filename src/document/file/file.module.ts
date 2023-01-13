import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { FileConfig } from './config/file.config';
import { fileConfig } from './config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    ConfigModule.forRoot({ isGlobal: true, load: [FileConfig] }),
    MulterModule.registerAsync({
      inject: [FileConfig.KEY],
      useFactory: (config: ConfigType<typeof FileConfig>) => fileConfig(config),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
