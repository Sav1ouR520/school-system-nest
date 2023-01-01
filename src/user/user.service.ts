import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, SelectUserDto } from './dto';
import { PaginationDto, RemoveFile } from 'src/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  register(userDto: CreateUserDto) {
    const { account } = userDto;
    const result = this.userRepository.findOneBy({ account });
    if (!result) {
      const user = this.userRepository.create(userDto);
      this.userRepository.save(user);
      return 'User created successfully';
    }
    return `This ${account} has already been used`;
  }

  async findAll(paginationQuery: PaginationDto, userDto: SelectUserDto) {
    const { limit, offset } = paginationQuery;
    const condition = {};
    let key: keyof SelectUserDto;
    for (key in userDto) {
      if ((userDto[key] && key === 'account') || key === 'username') {
        condition[key] = Like(userDto[key]);
      } else if (userDto[key]) {
        condition[key] = userDto[key];
      }
    }
    const list = await this.userRepository.find({
      where: condition,
      order: { registerTime: 'DESC' },
      skip: offset,
      take: limit,
    });
    const total = await this.userRepository.count({ where: condition });
    return { list, total };
  }

  findByAccount(account: string) {
    const user = this.userRepository.findOneBy({ account });
    return user
      ? user
      : new BadRequestException(`User #${account} does not exist`);
  }

  findByUUID(uuid: string) {
    const user = this.userRepository.findOneBy({ uuid });
    return user
      ? user
      : new BadRequestException(`User #${uuid} does not exist`);
  }

  updateUserInfo(uuid: string, userDto: UpdateUserDto) {
    const result = this.userModify(uuid, userDto.activeStatue, userDto);
    return result
      ? 'Successfully updated user information'
      : 'Failed to update user information';
  }

  async updateUserIcon(uuid: string, icon: string) {
    const user = await this.userRepository.preload({ uuid, icon });
    if (!user) {
      throw new BadRequestException(`User #${uuid} does not exist`);
    }
    const oldIcon = (await this.userRepository.findOneBy({ uuid })).icon;
    RemoveFile(oldIcon);
    this.userRepository.save(user);
    return '修改成功';
  }

  delete(uuid: string) {
    this.userRepository.delete({ uuid });
  }

  disableActive(uuid: string) {
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
    this.userRepository.save(user);
    return '修改成功';
  }
}
