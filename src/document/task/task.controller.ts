import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser, PathConfig } from 'src/common';
import { ConfigType } from '@nestjs/config';
import { TaskConfig } from './config';
import { CreateTaskDto, CreateTaskFileDto } from './dto';

@Controller('task')
@ApiTags('TaskController')
@ApiBearerAuth()
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    @Inject(PathConfig.KEY)
    private readonly pathConfig: ConfigType<typeof PathConfig>,
    @Inject(TaskConfig.KEY)
    private readonly taskConfig: ConfigType<typeof TaskConfig>,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTaskDto && CreateTaskFileDto })
  @ApiOperation({ summary: '创建任务', description: '创建任务' })
  addTask(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') createUser: string,
    @Body() taskDto: CreateTaskDto,
  ) {
    if (file) {
      const path =
        this.pathConfig.rootPath +
        this.taskConfig.taskUploadPath +
        file.filename;
      return this.taskService.addTask(createUser, taskDto, path);
    }
    return this.taskService.addTask(createUser, taskDto);
  }
}
