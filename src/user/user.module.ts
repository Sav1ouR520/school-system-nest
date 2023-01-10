import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UserConfig } from './config/user.config';
import { AdminController } from './admin.controller';
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
          destination: join(__dirname, '../../' + icon.userIconPath),
          filename: (_, file, callback) => {
            const fileName = new Date().getTime() + extname(file.originalname);
            return callback(null, fileName);
          },
        }),
      }),
    }),
  ],
  controllers: [UserController, AdminController],
  providers: [UserService],
})
export class UserModule {}
