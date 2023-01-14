import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepository')
    private readonly TaskRepository: Repository<Task>,
  ) {}
  findtaskByGroupId() {
    return '';
  }
  addTask() {
    return '';
  }
  deleteTask() {
    return '';
  }
  modifyTask() {
    return '';
  }
}
