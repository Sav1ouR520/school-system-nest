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

  async beforeAction(
    id: string,
    createUser: string,
    activeStatue = true,
    dataPath?: string,
  ) {
    const task = await this.TaskRepository.findOneBy({
      id,
      createUser,
      dataPath,
      activeStatue,
    });
    if (!task) {
      throw new BadRequestException(`
The task #${id} does not exist or the user #${createUser} exceeds permissions`);
    }
  }

  async findtaskByGroupId(
    groupId: string,
    createUser: string,
    activeStatue = true,
  ) {
    const data = await this.TaskRepository.find({
      where: { groupId, createUser, activeStatue },
      relations: ['group'],
    });
    return { data, message: 'Request data succeeded' };
  }

  async addTask(createUser: string, taskDto: CreateTaskDto, dataPath?: string) {
    const hasData = dataPath ? true : false;
    const task = this.TaskRepository.create({
      createUser,
      ...taskDto,
      hasData,
      dataPath,
    });
    await this.TaskRepository.save(task);
    return { message: 'Task created successfully' };
  }

  async deleteTask(id: string, createUser: string, activeStatue = true) {
    await this.beforeAction(id, createUser, activeStatue);
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
    const { id } = taskDto;
    await this.beforeAction(id, createUser, activeStatue, dataPath);
    const result = await this.TaskRepository.preload(taskDto);
    await this.TaskRepository.save(result);
    return { message: `Successfully updated task #${taskDto.id} information` };
  }
}
