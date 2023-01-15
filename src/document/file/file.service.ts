import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { User } from '../../common/entities';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async uploadFile(id: string, path: string) {
    const user = await this.userRepository.preload({ id });
    if (!user) {
      throw new BadRequestException(`User #${id} does not exist`);
    }
    // this.fileRepository.save()
  }
}
