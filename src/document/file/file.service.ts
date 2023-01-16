import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  checkFileByUserId(taskId: string, uploadUser: string) {
    const data = this.fileRepository.findOneBy({ taskId, uploadUser });
    return { data, message: 'Request data succeeded' };
  }

  async uploadFile(taskId: string, uploadUser: string, filePath: string) {
    const IsUpload = this.fileRepository.findOneBy({ taskId, uploadUser });
    if (IsUpload) {
      throw new BadRequestException(`Cannot submit task repeatedly`);
    }
    const file = this.fileRepository.create({ taskId, uploadUser, filePath });
    await this.fileRepository.save(file);
    return { message: 'Successfully uploaded the file' };
  }

  async updateFile(id: string, uploadUser: string, filePath: string) {
    const file = this.fileRepository.findOneBy({ id, uploadUser });
    if (file) {
      const updateFile = await this.fileRepository.preload({ id, filePath });
      await this.fileRepository.save(updateFile);
      return { message: 'File modified successfully' };
    }
    return { message: `You haven't uploaded a file yet` };
  }
}
