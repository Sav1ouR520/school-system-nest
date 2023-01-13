import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileService } from './file.service';
import { Controller, Inject, Post, UploadedFile } from '@nestjs/common';
import { GetUser } from 'src/common';
import { FileConfig } from './config/file.config';
import { ConfigType } from '@nestjs/config';

@Controller('file')
@ApiTags('FileController')
@ApiBearerAuth()
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(FileConfig.KEY)
    private readonly fileConfig: ConfigType<typeof FileConfig>,
  ) {}

  @Post('upload')
  @ApiOperation({ summary: '上传文件', description: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({})
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') id: string,
  ) {
    const path = this.fileConfig.fileUploadPath + file.filename;
    return this.fileService.uploadFile(id, path);
  }
}
