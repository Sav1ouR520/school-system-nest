import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { compareSync } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(userDto: CreateUserDto) {
    const { account } = userDto;
    const result = await this.userRepository.findOneBy({ account });
    if (!result) {
      const user = this.userRepository.create(userDto);
      this.userRepository.save(user);
      return 'User created successfully';
    }
    return `This ${account} has already been used`;
  }

  async login(userDto: CreateUserDto) {
    const { account, password } = userDto;
    const user = await this.userRepository.findOneBy({ account });
    if (user && compareSync(password, user.password)) {
      return 'success';
    }
    return 'The account does not exist or the password is incorrect';
  }

  findAll(paginationQuery: PaginationDto) {
    const { limit, offset } = paginationQuery;
    return this.userRepository.find({ skip: offset, take: limit });
  }

  findByUid(uuid: string) {
    const user = this.userRepository.findOneBy({ uuid });
    return user
      ? user
      : new BadRequestException(`User #${uuid} does not exist`);
  }

  update(uuid: string, userDto: UpdateUserDto) {
    const result = this.userModify(uuid, userDto.activeStatue, userDto);
    return result
      ? 'Successfully updated user information'
      : 'Failed to update user information';
  }

  remove(uuid: string) {
    const result = this.userModify(uuid, false);
    return result ? 'User has been deleted' : 'Failed to delete user';
  }

  async userModify(uuid: string, activeStatue = true, userDto?: UpdateUserDto) {
    const user = await this.userRepository.preload({
      uuid,
      ...userDto,
      activeStatue,
    });
    if (!user) {
      throw new BadRequestException(`User #${uuid} does not exist`);
    }
    const result = this.userRepository.save(user);
    return result ? true : false;
  }
}
