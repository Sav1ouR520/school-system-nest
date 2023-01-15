import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto';
import { Task } from './entities';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepository')
    private readonly TaskRepository: Repository<Task>,
  ) {}
  findtaskByGroupId(groudId: string) {
    const data = this.TaskRepository.find({
      where: { groudId },
      relations: ['group'],
    });
    return { data, message: 'Request data succeeded' };
  }
  addTask(createUser: string, taskDto: CreateTaskDto, dataPath?: string) {
    const hasData = dataPath ? true : false;
    const task = this.TaskRepository.create({
      createUser,
      ...taskDto,
      hasData,
      dataPath,
    });
    return this.TaskRepository.save(task);
  }
  deleteTask() {
    return '';
  }
  modifyTask() {
    return '';
  }
}
