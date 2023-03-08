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
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser, UUIDvalidatePipe } from 'src/common';
import {
  CreateFileDto,
  CreateFileWithDataDto,
  UpdateFileDto,
  UpdateFileWithDataDto,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
@ApiTags('FileController')
@ApiBearerAuth()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':taskId')
  @ApiOperation({ summary: '查看上传文件', description: '查看上传文件' })
  checkFile(
    @Param('taskId', UUIDvalidatePipe) taskId: string,
    @GetUser('id') userId: string,
  ) {
    return this.fileService.checkFileByUserId(taskId, userId);
  }

  @Delete(':fileId')
  @ApiOperation({ summary: '撤回上传文件', description: '撤回上传文件' })
  goBackFileByTaskId(
    @Param('fileId', UUIDvalidatePipe) fileId: string,
    @GetUser('id') userId: string,
  ) {
    return this.fileService.goBackFileByTaskId(fileId, userId);
  }

  @Get('taskId/:taskId')
  @ApiOperation({ summary: '查看上传文件', description: '查看上传文件' })
  findFileBytaskId(
    @Param('taskId', UUIDvalidatePipe) taskId: string,
    @GetUser('id') userId: string,
  ) {
    return this.fileService.findFileBytaskId(taskId, userId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateFileWithDataDto })
  @ApiOperation({ summary: '上传文件', description: '上传文件' })
  uploadFile(
    @Body() fileDto: CreateFileDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') userId: string,
  ) {
    return this.fileService.uploadFile(fileDto.taskId, userId, file.filename);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '修改文件', description: '修改文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateFileWithDataDto })
  updateFile(
    @Body() fileDto: UpdateFileDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') userId: string,
  ) {
    return this.fileService.updateFile(
      fileDto.id,
      fileDto.taskId,
      userId,
      file.filename,
    );
  }
}
