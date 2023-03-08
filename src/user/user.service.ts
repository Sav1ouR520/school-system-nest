import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto, SelectUserDto } from './dto';
import { PaginationDto, RemoveFile, ReturnData } from 'src/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: Repository<User>,
  ) {}

  async accountAvailable(account: string): Promise<ReturnData> {
    const result = await this.userRepository.findOneBy({ account });
    return result
      ? {
          action: false,
          message: `This ${account} has already been used`,
        }
      : {
          action: true,
          message: `This ${account} can be used`,
        };
  }

  async register(userDto: CreateUserDto): Promise<ReturnData> {
    const result = await this.accountAvailable(userDto.account);
    if (result.action) {
      const user = this.userRepository.create(userDto);
      this.userRepository.save(user);
      return {
        action: true,
        message: `User #${userDto.account} created successfully`,
      };
    }
    throw new BadRequestException(
      `This ${userDto.account} has already been used`,
    );
  }

  async findAll(
    paginationQuery: PaginationDto,
    userDto: SelectUserDto,
  ): Promise<ReturnData> {
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
    return {
      data: { list, total },
      action: true,
      message: 'Request data succeeded',
    };
  }

  async findUserById(id: string): Promise<ReturnData> {
    const user = await this.userRepository.findOneBy({ id });
    return user
      ? { data: user, action: true, message: 'Request data succeeded' }
      : { action: false, message: `User #${id} does not exist` };
  }

  async updateUserInfo(id: string, userDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (user.account !== userDto.account) {
      const result = await this.accountAvailable(userDto.account);
      if (!result.action) {
        return result;
      }
    }
    await this.userInfoModify(id, userDto.activeStatue, userDto);
    return {
      action: true,
      message: 'Successfully updated user information',
    };
  }

  async updateUserIcon(id: string, icon: string): Promise<ReturnData> {
    const user = await this.userRepository.preload({ id, icon });
    if (!user) {
      throw new BadRequestException(`User #${id} does not exist`);
    }
    const oldIcon = (await this.userRepository.findOneBy({ id })).icon;
    RemoveFile(oldIcon);
    this.userRepository.save(user);
    return {
      action: true,
      message: `Successfully modified User #${id} image`,
    };
  }

  async deleteUser(id: string): Promise<ReturnData> {
    const result = await this.userRepository.delete({ id });
    return result.affected === 1
      ? {
          action: true,
          message: 'User has been deleted',
        }
      : {
          action: false,
          message: 'Failed to delete user',
        };
  }

  async disableUserActiveStatus(id: string): Promise<ReturnData> {
    await this.userInfoModify(id, false);
    return {
      action: false,
      message: 'User has been deleted',
    };
  }

  async userInfoModify(
    id: string,
    activeStatue = true,
    userDto?: UpdateUserDto,
  ): Promise<ReturnData> {
    const user = await this.userRepository.preload({
      id,
      ...userDto,
      activeStatue,
    });
    if (!user) {
      return {
        action: false,
        message: `User #${id} does not exist`,
      };
    }
    await this.userRepository.save(user);
    return {
      action: true,
      message: `Successfully modified User #${id}`,
    };
  }
}
