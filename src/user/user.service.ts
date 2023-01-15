import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto, SelectUserDto } from './dto';
import { PaginationDto, RemoveFile } from 'src/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
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

  async register(userDto: CreateUserDto) {
    const result = await this.accountAvailable(userDto.account);
    if (result.data.available) {
      const { account, password } = userDto;
      const user = this.userRepository.create({ account, password });
      this.userRepository.save(user);
      return {
        data: { validation: true },
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

  async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user ? user : new BadRequestException(`User #${id} does not exist`);
  }

  async updateUserInfo(id: string, userDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (user.account !== userDto.account) {
      const result = await this.accountAvailable(userDto.account);
      if (!result.data.available) {
        return result;
      }
    }
    this.userInfoModify(id, userDto.activeStatue, userDto);
    return { message: 'Successfully updated user information' };
  }

  async updateUserIcon(id: string, icon: string) {
    const user = await this.userRepository.preload({ id, icon });
    if (!user) {
      throw new BadRequestException(`User #${id} does not exist`);
    }
    const oldIcon = (await this.userRepository.findOneBy({ id })).icon;
    RemoveFile(oldIcon);
    this.userRepository.save(user);
    return { message: `Successfully modified User #${id} image` };
  }

  async deleteUser(id: string) {
    const result = await this.userRepository.delete({ id });
    return result.affected === 1
      ? { message: 'User has been deleted' }
      : { message: 'Failed to delete user' };
  }

  async disableUserActiveStatus(id: string) {
    await this.userInfoModify(id, false);
    return { message: 'User has been deleted' };
  }

  async userInfoModify(
    id: string,
    activeStatue = true,
    userDto?: UpdateUserDto,
  ) {
    const user = await this.userRepository.preload({
      id,
      ...userDto,
      activeStatue,
    });
    if (!user) {
      throw new BadRequestException(`User #${id} does not exist`);
    }
    return this.userRepository.save(user);
  }
}
