import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
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
import { GetUser, PathConfig, UUIDvalidatePipe } from 'src/common';
import { ConfigType } from '@nestjs/config';
import { TaskConfig } from './config';
import { CreateTaskDto, TaskFileDto, UploadTaskDto } from './dto';

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

  @Get(':groupId')
  @ApiOperation({ summary: '查找任务', description: '查找任务' })
  findTaskByGroudId(
    @Param('groupId', UUIDvalidatePipe) groupId: string,
    @GetUser('id') userId: string,
  ) {
    return this.taskService.findtaskByGroupId(groupId, userId);
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTaskDto && TaskFileDto })
  @ApiOperation({ summary: '创建任务', description: '创建任务' })
  addTask(
    @Body() taskDto: CreateTaskDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') createUser: string,
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

  @Delete(':id')
  @ApiOperation({ summary: '删除任务', description: '删除任务' })
  deleteTask(
    @GetUser('id') createUser: string,
    @Param('id', UUIDvalidatePipe) id: string,
  ) {
    return this.taskService.deleteTask(id, createUser);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadTaskDto && TaskFileDto })
  @ApiOperation({ summary: '修改任务', description: '修改任务' })
  modifyTask(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') createUser: string,
    @Body() taskDto: UploadTaskDto,
  ) {
    if (file) {
      const path =
        this.pathConfig.rootPath +
        this.taskConfig.taskUploadPath +
        file.filename;
      return this.taskService.modifyTask(createUser, taskDto, path);
    }
    return this.taskService.modifyTask(createUser, taskDto);
  }
}
