import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { UserConfig } from './config/user.config';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({ isGlobal: true, load: [UserConfig] }),
    MulterModule.registerAsync({
      inject: [UserConfig.KEY],
      useFactory: (icon: ConfigType<typeof UserConfig>) => ({
        fileFilter(_, file, callback) {
          const fileType = file.mimetype.split('/')[0];
          fileType == 'image' ? callback(null, true) : callback(null, false);
        },
        storage: diskStorage({
          destination: join(__dirname, '../' + icon.userIconPath),
          filename: (_, file, callback) => {
            const fileName = new Date().getTime() + extname(file.originalname);
            return callback(null, fileName);
          },
        }),
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
