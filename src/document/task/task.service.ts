import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDto, ModifyTaskDto } from './dto';
import { Task } from './entities';
import { Member, ReturnData, File, Group } from 'src/common';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: Repository<Task>,
    @Inject('MemberRepository')
    private readonly memberRepository: Repository<Member>,
    @Inject('GroupRepository')
    private readonly groupRepository: Repository<Group>,
    @Inject('FileRepository')
    private readonly fileRepository: Repository<File>,
  ) {}

  async checkMemberExist(groupId: string, userId: string, checkRole = false) {
    const member = await this.memberRepository.findOneBy({
      groupId,
      userId,
      status: true,
    });
    if (!member) {
      throw new BadRequestException(
        `the user #${userId} does not belong to this group ${groupId}`,
      );
    }
    if (checkRole) {
      if (member.role !== 'admin') {
        throw new BadRequestException(
          `the user #${userId} exceeds permissions`,
        );
      }
    }
    return member;
  }

  async beforeActionWithGroupId(
    groupId: string,
    userId: string,
    checkRole = false,
  ) {
    const group = await this.groupRepository.findOneBy({
      id: groupId,
      status: true,
    });
    if (!group) {
      throw new BadRequestException(`The group #${groupId} does not exist `);
    }
    return await this.checkMemberExist(groupId, userId, checkRole);
  }

  async beforeActionWithTaskId(
    taskId: string,
    userId: string,
    checkRole = false,
  ) {
    const task = await this.taskRepository.findOneBy({
      id: taskId,
      status: true,
    });
    if (!task) {
      throw new BadRequestException(`The task #${taskId} does not exist `);
    }
    return await this.checkMemberExist(task.groupId, userId, checkRole);
  }

  async findTaskByCreater(userId: string): Promise<ReturnData> {
    const data = await this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.group', 'group', 'group.status = :status', {
        status: true,
      })
      .leftJoinAndSelect(
        'group.task',
        'task',
        'task.status = :status and task.memberId = member.id',
        { status: true },
      )
      .leftJoinAndSelect(
        'group.member',
        'group_member',
        'group_member.status = :status',
        {
          status: true,
        },
      )
      .leftJoinAndSelect('task.file', 'file', 'file.status = :status ', {
        status: true,
      })
      .where({ userId, status: true })
      .getMany();
    const tasks = [];
    data.forEach((member) => {
      if (member.group.task) {
        member.group.task.forEach((task) => {
          tasks.push({
            task: {
              id: task.id,
              name: task.name,
              createTime: task.createTime,
              file: task.file.length,
            },
            group: {
              id: member.group.id,
              icon: member.group.icon,
              name: member.group.name,
              member: member.group.member.length,
            },
          });
        });
      }
    });
    return { data: tasks, action: true, message: 'Request data succeeded' };
  }

  async findTasksByUserId(userId: string): Promise<ReturnData> {
    const data = await this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.group', 'group', 'group.status = :status', {
        status: true,
      })
      .leftJoinAndSelect('group.task', 'task', 'task.status = :status', {
        status: true,
      })
      .leftJoinAndSelect(
        'task.file',
        'file',
        'file.status = :status and member.id = file.memberId',
        {
          status: true,
        },
      )
      .where({ userId, status: true })
      .getMany();
    const tasks = [];
    data.forEach((member) => {
      if (member.group.task) {
        member.group.task.forEach((task) => {
          tasks.push({
            task: {
              id: task.id,
              name: task.name,
              file: task.file.length !== 0,
              createTime: task.createTime,
            },
            group: {
              id: member.group.id,
              icon: member.group.icon,
              name: member.group.name,
            },
          });
        });
      }
    });
    return { data: tasks, action: true, message: 'Request data succeeded' };
  }

  async findtaskInfoByTaskId(
    taskId: string,
    userId: string,
  ): Promise<ReturnData> {
    await this.beforeActionWithTaskId(taskId, userId, true);
    const data = await this.taskRepository.findOne({
      where: { id: taskId, status: true },
      relations: ['member'],
    });
    return {
      data,
      action: true,
      message: 'Request data succeeded',
    };
  }

  async findtaskWithFileByTaskId(
    taskId: string,
    userId: string,
  ): Promise<ReturnData> {
    const member = await this.beforeActionWithTaskId(taskId, userId);
    const task = await this.taskRepository.findOne({
      where: { id: taskId, status: true },
      relations: ['member'],
    });
    const File = await this.fileRepository.findOne({
      where: { taskId, memberId: member.id, status: true },
    });
    return {
      data: { task, File },
      action: true,
      message: 'Request data succeeded',
    };
  }

  async findtaskByGroupId(
    groupId: string,
    userId: string,
  ): Promise<ReturnData> {
    await this.beforeActionWithGroupId(groupId, userId);
    const data = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.file', 'file', 'file.status = :status', {
        status: true,
      })
      .leftJoinAndSelect('file.member', 'member')
      .where({ groupId, status: true })
      .getMany();
    for (const i in data) {
      for (const j in data[i].file) {
        const member = data[i].file[j]?.member;
        if (member && !member.status) {
          data[i].file = data[i].file.filter(
            (file) => file.memberId !== member.id,
          );
        }
      }
    }
    const task = [];
    data.forEach((item) => {
      task.push({ id: item.id, name: item.name, file: item.file.length });
    });
    return { data: task, action: true, message: 'Request data succeeded' };
  }

  async addTask(userId: string, taskDto: CreateTaskDto, dataPath?: string) {
    const member = await this.beforeActionWithGroupId(
      taskDto.groupId,
      userId,
      true,
    );
    const task = this.taskRepository.create({
      memberId: member.id,
      ...taskDto,
      dataPath,
    });
    await this.taskRepository.save(task);
    return { message: 'Task created successfully' };
  }

  async deleteTask(taskIds: string[], userId: string, checkRole = true) {
    const all_before_action_promise: Promise<Member>[] = [];
    taskIds.forEach((taskId) =>
      all_before_action_promise.push(
        this.beforeActionWithTaskId(taskId, userId, checkRole),
      ),
    );
    await Promise.all(all_before_action_promise);
    const all_preload_promise: Promise<Task>[] = [];
    taskIds.forEach((taskId) =>
      all_preload_promise.push(
        this.taskRepository.preload({
          id: taskId,
          status: false,
        }),
      ),
    );
    const result = await Promise.all(all_preload_promise);
    await this.taskRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(result);
      },
    );
    return { message: `Task #${taskIds} has been deleted` };
  }

  async modifyTask(
    userId: string,
    taskDto: ModifyTaskDto,
    dataPath?: string,
    checkRole = true,
  ) {
    await this.beforeActionWithTaskId(taskDto.id, userId, checkRole);
    const result = await this.taskRepository.preload({ ...taskDto, dataPath });
    await this.taskRepository.save(result);
    return { message: `Successfully updated task #${taskDto.id} information` };
  }

  async clearFilePath(taskId: string, userId: string) {
    await this.beforeActionWithTaskId(taskId, userId);
    const result = await this.taskRepository.preload({
      id: taskId,
      dataPath: null,
    });
    await this.taskRepository.save(result);
    return {
      message: `Successfully remove task #${taskId} file`,
    };
  }
}
