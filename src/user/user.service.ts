import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { compareSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
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
      const token = this.getTokens(user.uuid);
      this.updateRefreshToken(user.uuid, (await token).refresh_token);
      return token;
    }
    return 'The account does not exist or the password is incorrect';
  }

  async findAll(paginationQuery: PaginationDto) {
    const { limit, offset } = paginationQuery;
    return await this.userRepository.find({ skip: offset, take: limit });
  }

  async findByUid(uuid: string) {
    const user = await this.userRepository.findOneBy({ uuid });
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

  async getTokens(uuid: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { uuid },
        { secret: 'at-secret', expiresIn: 60 * 60 },
      ),
      this.jwtService.signAsync(
        { uuid },
        { secret: 'rt-secret', expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);
    return { access_token, refresh_token };
  }

  async updateRefreshToken(uuid: string, rt: string) {
    const refreshToken = hashSync(rt, 10);
    const user = await this.userRepository.preload({ uuid, refreshToken });
    this.userRepository.save(user);
  }

  async logout(uuid: string) {
    const refreshToken = null;
    const user = await this.userRepository.preload({ uuid, refreshToken });
    this.userRepository.save(user);
  }

  async refreshToken(uuid: string, rt: string) {
    const user = await this.userRepository.findOneBy({ uuid });
    const rtMatches = compareSync(rt, user.refreshToken);
    if (rtMatches) {
      const tokens = await this.getTokens(uuid);
      await this.updateRefreshToken(uuid, rt);
      return tokens;
    }
    throw new ForbiddenException('Access Denied');
  }
}
