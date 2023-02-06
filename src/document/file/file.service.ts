import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities';
import { ReturnData } from 'src/common';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async checkFileByUserId(
    taskId: string,
    uploadUser: string,
  ): Promise<ReturnData> {
    const data = await this.fileRepository.findOneBy({ taskId, uploadUser });
    return { data, action: true, message: 'Request data succeeded' };
  }

  async uploadFile(
    taskId: string,
    uploadUser: string,
    filePath: string,
  ): Promise<ReturnData> {
    const IsUpload = this.fileRepository.findOneBy({ taskId, uploadUser });
    if (IsUpload) {
      throw new BadRequestException(`Cannot submit task repeatedly`);
    }
    const file = this.fileRepository.create({ taskId, uploadUser, filePath });
    await this.fileRepository.save(file);
    return { action: true, message: 'Successfully uploaded the file' };
  }

  async updateFile(
    id: string,
    uploadUser: string,
    filePath: string,
  ): Promise<ReturnData> {
    const file = this.fileRepository.findOneBy({ id, uploadUser });
    if (file) {
      const updateFile = await this.fileRepository.preload({ id, filePath });
      await this.fileRepository.save(updateFile);
      return { action: true, message: 'File modified successfully' };
    }
    return { action: false, message: `You haven't uploaded a file yet` };
  }
}
