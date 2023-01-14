import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TaskService } from './task.service';

@Controller('task')
@ApiTags('TaskController')
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
}
