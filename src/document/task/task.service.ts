import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDto, UploadTaskDto } from './dto';
import { Task } from './entities';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepository')
    private readonly TaskRepository: Repository<Task>,
  ) {}

  findtaskByGroupId(groupId: string, createUser: string, activeStatue = true) {
    const data = this.TaskRepository.find({
      where: { groupId, createUser, activeStatue },
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

  async deleteTask(id: string, createUser: string, activeStatue = true) {
    const task = await this.TaskRepository.findOneBy({
      id,
      createUser,
      activeStatue,
    });
    if (!task) {
      throw new BadRequestException(`
The task #${id} does not exist or the user #${createUser} exceeds permissions`);
    }
    const result = await this.TaskRepository.preload({
      id,
      activeStatue: false,
    });
    const { name } = await this.TaskRepository.save(result);
    return { message: `Task #${name} has been deleted` };
  }

  async modifyTask(
    createUser: string,
    taskDto: UploadTaskDto,
    dataPath?: string,
    activeStatue = true,
  ) {
    const task = await this.TaskRepository.findOneBy({
      id: taskDto.id,
      dataPath,
      createUser,
      activeStatue,
    });
    if (!task) {
      throw new BadRequestException(`
The task #${taskDto.id} does not exist or the user #${createUser} exceeds permissions`);
    }
    const result = await this.TaskRepository.preload(taskDto);
    await this.TaskRepository.save(result);
    return { message: `Successfully updated task #${taskDto.id} information` };
  }
}
