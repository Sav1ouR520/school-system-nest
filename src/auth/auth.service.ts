import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto';
import { User } from 'src/common';
import { JWTConfig } from './config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('UserRepository')
    private readonly userRepository: Repository<User>,
    @Inject(JWTConfig.KEY)
    private readonly configService: ConfigType<typeof JWTConfig>,
  ) {}

  async login(userDto: LoginUserDto) {
    const { account, password } = userDto;
    const user = await this.userRepository.findOneBy({ account });
    if (user && user.activeStatue && compareSync(password, user.password)) {
      const token = await this.getTokens(user.id);
      this.updateRefreshToken(user.id, (await token).token.refreshToken);
      return {
        data: { ...token, validation: true },
        message: 'login success',
      };
    }
    return {
      data: { validation: false },
      message: 'The account does not exist or the password is incorrect',
    };
  }

  async getTokens(id: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ id }, this.configService.acceptTokens),
      this.jwtService.signAsync({ id }, this.configService.refreshToken),
    ]);
    return {
      token: { accessToken, refreshToken },
      message: 'Login Successful',
    };
  }

  async updateRefreshToken(id: string, rt: string) {
    const refreshToken = hashSync(rt, 10);
    const user = await this.userRepository.preload({ id, refreshToken });
    this.userRepository.save(user);
  }

  async logout(id: string) {
    const refreshToken = null;
    const user = await this.userRepository.preload({ id, refreshToken });
    this.userRepository.save(user);
  }

  async refreshToken(id: string, rt: string) {
    const user = await this.userRepository.findOneBy({ id });
    const rtMatches = compareSync(rt, user.refreshToken);
    if (rtMatches) {
      const tokens = await this.getTokens(id);
      await this.updateRefreshToken(id, rt);
      return tokens;
    }
    throw new ForbiddenException('Access Denied');
  }
}
