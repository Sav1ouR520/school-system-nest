import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileService } from './file.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { GetUser, UUIDvalidatePipe } from 'src/common';
import { FileConfig } from './config/file.config';
import { ConfigType } from '@nestjs/config';
import { FileDto } from './dto';

@Controller('file')
@ApiTags('FileController')
@ApiBearerAuth()
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(FileConfig.KEY)
    private readonly fileConfig: ConfigType<typeof FileConfig>,
  ) {}

  @Get(':taskId')
  @ApiOperation({ summary: '查看上传文件', description: '查看上传文件' })
  checkFile(
    @Param('taskId', UUIDvalidatePipe) taskId: string,
    @GetUser('id') uploadUser: string,
  ) {
    return this.fileService.checkFileByUserId(taskId, uploadUser);
  }

  @Post()
  @ApiOperation({ summary: '上传文件', description: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileDto })
  uploadFile(
    @Body() fileDto: FileDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') uploadUser: string,
  ) {
    const filePath = this.fileConfig.fileUploadPath + file.filename;
    return this.fileService.uploadFile(fileDto.taskId, uploadUser, filePath);
  }

  @Patch()
  @ApiOperation({ summary: '修改文件', description: '修改文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileDto })
  updateFile(
    @Body() fileDto: FileDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') uploadUser: string,
  ) {
    const filePath = this.fileConfig.fileUploadPath + file.filename;
    return this.fileService.updateFile(fileDto.taskId, uploadUser, filePath);
  }
}
