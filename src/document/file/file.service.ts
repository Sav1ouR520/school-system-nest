import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities';
import { Member, ReturnData, Task } from 'src/common';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async beforeAction(taskId: string, userId: string) {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new BadRequestException(`The task #${taskId}  does not exist`);
    }
    const member = await this.memberRepository.findOneBy({
      userId,
      groupId: task.groupId,
    });
    if (!member) {
      throw new BadRequestException(
        `The group #${task.groupId} does not belong to this user #${userId}`,
      );
    } else {
      return member;
    }
  }

  async findFileBytaskId(
    taskId: string,
    userId: string,
    status?: true,
  ): Promise<ReturnData> {
    const member = await this.beforeAction(taskId, userId);
    const { groupId } = await this.taskRepository.findOneBy({ id: taskId });
    if (member.role === 'admin') {
      const data = await this.memberRepository
        .createQueryBuilder('member')
        .leftJoinAndSelect('member.file', 'file', 'file.status = :status', {
          status,
        })
        .where({ groupId })
        .getMany();
      return { data, action: true, message: 'Request data succeeded' };
    }
    throw new BadRequestException(
      `User #${userId} does not have group permissions`,
    );
  }

  async checkFileByUserId(
    taskId: string,
    userId: string,
    status?: true,
  ): Promise<ReturnData<File>> {
    const member = await this.beforeAction(taskId, userId);
    const data = await this.fileRepository.findOneBy({
      taskId,
      memberId: member.id,
      status,
    });
    return { data, action: true, message: 'Request data succeeded' };
  }

  async uploadFile(
    taskId: string,
    userId: string,
    filePath: string,
  ): Promise<ReturnData> {
    const member = await this.beforeAction(taskId, userId);
    const IsUpload = await this.fileRepository.findOneBy({
      taskId,
      memberId: member.id,
    });
    if (IsUpload) {
      throw new BadRequestException(`Cannot submit task repeatedly`);
    }
    const file = this.fileRepository.create({
      taskId,
      memberId: member.id,
      filePath,
      message: '文件上传',
    });
    await this.fileRepository.save(file);
    return { action: true, message: 'Successfully uploaded the file' };
  }

  async updateFile(
    id: string,
    taskId: string,
    userId: string,
    filePath: string,
  ): Promise<ReturnData> {
    const member = await this.beforeAction(taskId, userId);
    const hasFile = await this.fileRepository.find({
      where: { id, memberId: member.id, status: true },
    });
    if (hasFile) {
      const file = this.fileRepository.create({
        taskId,
        memberId: member.id,
        filePath,
        message: '文件修改',
      });
      this.fileRepository.manager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.save(file);
          const activeFile = await this.fileRepository.find({
            where: { taskId, memberId: member.id, status: true },
          });
          if (activeFile) {
            activeFile.forEach((file) => (file.status = false));
            await transactionalEntityManager.save(activeFile);
          }
          return { action: true, message: 'File modified successfully' };
        },
      );
    }
    return { action: false, message: `You haven't uploaded a file yet` };
  }
}
