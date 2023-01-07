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

  async accountAvailable(account: string) {
    const result = await this.userRepository.findOneBy({ account });
    return result
      ? {
          data: { available: false },
          message: `This ${account} has already been used`,
        }
      : {
          data: { available: true },
          message: `This ${account} can be used`,
        };
  }

  async register(session: any, captcha: string, userDto: CreateUserDto) {
    if (session.code.toLocaleLowerCase() !== captcha.toLocaleLowerCase()) {
      return { message: 'Incorrect verification code' };
    }
    const result = await this.accountAvailable(userDto.account);
    if (result.data.available) {
      const user = this.userRepository.create(userDto);
      this.userRepository.save(user);
      return {
        message: `User #${userDto.account} created successfully`,
      };
    }
    throw new BadRequestException(
      `This ${userDto.account} has already been used`,
    );
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
    return { data: { list, total }, message: 'Request data succeeded' };
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
      ? { message: 'Successfully updated user information' }
      : { message: 'Failed to update user information' };
  }

  async updateUserIcon(uuid: string, icon: string) {
    const user = await this.userRepository.preload({ uuid, icon });
    if (!user) {
      throw new BadRequestException(`User #${uuid} does not exist`);
    }
    const oldIcon = (await this.userRepository.findOneBy({ uuid })).icon;
    RemoveFile(oldIcon);
    this.userRepository.save(user);
    return { message: `Successfully modified User #${uuid} image` };
  }

  delete(uuid: string) {
    const result = this.userRepository.delete({ uuid });
    return result
      ? { message: 'User has been deleted' }
      : { message: 'Failed to delete user' };
  }

  disableActive(uuid: string) {
    const result = this.userModify(uuid, false);
    return result
      ? { message: 'User has been deleted' }
      : { message: 'Failed to delete user' };
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
    return this.userRepository.save(user);
  }
}
