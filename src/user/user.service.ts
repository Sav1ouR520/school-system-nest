import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Like, MoreThan, Repository } from 'typeorm';
import { User } from './entities';
import {
  CreateUserDto,
  UpdateUserDto,
  SelectUserDto,
  UpdateUserUsernameDto,
  AdminUpdateUserDto,
} from './dto';
import { PaginationDto, ReturnData } from 'src/common';
import { compareSync } from 'bcryptjs';

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
      if (
        (userDto[key] && key === 'account') ||
        (userDto[key] && key === 'username')
      ) {
        condition[key] = Like(`%${userDto[key]}%`);
      } else if (userDto[key] && key === 'registerTime') {
        condition[key] = MoreThan(userDto[key]);
      } else if (userDto[key]) {
        condition[key] = userDto[key];
      }
    }
    const list = await this.userRepository.find({
      select: [
        'id',
        'icon',
        'status',
        'username',
        'account',
        'registerTime',
        'role',
      ],
      where: condition,
      order: { registerTime: 'DESC' },
      skip: offset && limit ? (offset - 1) * limit : 0,
      take: limit <= 10 ? limit : 10,
    });
    const total = await this.userRepository.count({ where: condition });
    return {
      data: { list, total },
      action: true,
      message: 'Request data succeeded',
    };
  }

  async findUserById(id: string): Promise<ReturnData> {
    const user = await this.userRepository.findOne({
      select: [
        'id',
        'status',
        'icon',
        'username',
        'account',
        'registerTime',
        'role',
      ],
      where: { id },
    });
    return user
      ? { data: user, action: true, message: 'Request data succeeded' }
      : { action: false, message: `User #${id} does not exist` };
  }
  async adminUpdateUserInfo(
    adminId: string,
    userId: string,
    userDto: AdminUpdateUserDto,
    icon?: string,
  ) {
    await this.beforeAction(userId);
    if (adminId === userId) {
      throw new BadRequestException(`You Can't modify youself`);
    }
    const user = await this.userRepository.preload({
      id: userId,
      ...userDto,
      status: userDto.status === 'false' ? false : true,
      icon,
    });
    await this.userRepository.save(user);
    return {
      action: true,
      message: 'Successfully updated user information',
    };
  }
  async updateUserInfo(id: string, userDto: UpdateUserDto, icon?: string) {
    await this.beforeAction(id);
    const user = await this.userRepository.preload({
      id,
      ...userDto,
      icon,
    });
    await this.userRepository.save(user);
    return {
      action: true,
      message: 'Successfully updated user information',
    };
  }

  async updateUserUsername(id: string, userDto: UpdateUserUsernameDto) {
    await this.beforeAction(id);
    const user = await this.userRepository.preload({
      id,
      ...userDto,
    });
    await this.userRepository.save(user);
    return {
      action: true,
      message: 'Successfully updated user information',
    };
  }
  async updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.beforeAction(id);
    if (!compareSync(oldPassword, user.password)) {
      return {
        action: false,
        message: 'The old password is incorrect',
      };
    } else if (compareSync(newPassword, user.password)) {
      return {
        action: false,
        message: 'The new password cannot be the same as the old password',
      };
    }
    const entity = await this.userRepository.preload({
      id,
      password: newPassword,
    });
    await this.userRepository.save(entity);
    return {
      action: true,
      message: 'Successfully updated user information',
    };
  }

  async updateUserIcon(id: string, icon: string) {
    await this.beforeAction(id);
    const user = await this.userRepository.preload({ id, icon });
    await this.userRepository.save(user);
    return {
      action: true,
      message: 'Successfully updated user information',
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
    await this.beforeAction(id);
    const user = await this.userRepository.preload({ id, status: false });
    await this.userRepository.save(user);
    return {
      action: true,
      message: 'User has been deleted',
    };
  }

  async beforeAction(id: string) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new BadRequestException(`User #${id} does not exist`);
    }
    return user;
  }
}
