import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcryptjs';
import { JWTConfig } from 'src/auth/config/jwt.config';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(JWTConfig.KEY)
    private readonly configService: ConfigType<typeof JWTConfig>,
  ) {}

  async login(userDto: LoginUserDto) {
    const { account, password } = userDto;
    const user = await this.userRepository.findOneBy({ account });
    if (user && user.activeStatue && compareSync(password, user.password)) {
      const token = this.getTokens(user.uuid);
      this.updateRefreshToken(user.uuid, (await token).data.refresh_token);
      return token;
    }
    return {
      message: 'The account does not exist or the password is incorrect',
    };
  }

  async getTokens(uuid: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync({ uuid }, this.configService.acceptTokens),
      this.jwtService.signAsync({ uuid }, this.configService.refreshToken),
    ]);
    return {
      data: { access_token, refresh_token },
      message: 'Login Successful',
    };
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
