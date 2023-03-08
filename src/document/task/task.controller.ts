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
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser, UUIDvalidatePipe } from 'src/common';
import {
  CreateTaskDto,
  CreateTaskWithFile,
  ModifyTaskDto,
  ModifyTaskWithFile,
} from './dto';

@Controller('task')
@ApiTags('TaskController')
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':taskId')
  @ApiOperation({ summary: '查找任务', description: '查找任务' })
  findtaskInfoByTaskId(
    @Param('taskId', UUIDvalidatePipe) taskId: string,
    @GetUser('id') userId: string,
  ) {
    return this.taskService.findtaskInfoByTaskId(taskId, userId);
  }

  @Get('taskId/:taskId')
  @ApiOperation({ summary: '查找任务', description: '查找任务' })
  findTaskByTaskId(
    @Param('taskId', UUIDvalidatePipe) taskId: string,
    @GetUser('id') userId: string,
  ) {
    return this.taskService.findtaskByTaskId(taskId, userId);
  }

  @Get('groupId/:groupId')
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
  @ApiBody({ type: CreateTaskWithFile })
  @ApiOperation({ summary: '创建任务', description: '创建任务' })
  addTask(
    @Body() taskDto: CreateTaskDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') createUser: string,
  ) {
    if (file) {
      return this.taskService.addTask(createUser, taskDto, file.filename);
    }
    return this.taskService.addTask(createUser, taskDto);
  }

  @Delete()
  @ApiOperation({ summary: '删除任务', description: '删除任务' })
  deleteTask(
    @GetUser('id') createUser: string,
    @Body('ids', UUIDvalidatePipe) ids: string[],
  ) {
    return this.taskService.deleteTask(ids, createUser);
  }

  @Delete('file/:id')
  @ApiOperation({ summary: '删除任务文件', description: '删除任务文件' })
  clearFilePath(
    @GetUser('id') createUser: string,
    @Param('id', UUIDvalidatePipe) id: string,
  ) {
    return this.taskService.clearFilePath(id, createUser);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ModifyTaskWithFile })
  @ApiOperation({ summary: '修改任务', description: '修改任务' })
  modifyTask(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') createUser: string,
    @Body() taskDto: ModifyTaskDto,
  ) {
    if (file) {
      return this.taskService.modifyTask(createUser, taskDto, file.filename);
    }
    return this.taskService.modifyTask(createUser, taskDto);
  }
}
