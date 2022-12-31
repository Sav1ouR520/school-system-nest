import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { JWTConfig } from '../config/jwt.config';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(JWTConfig.KEY)
    private readonly configService: ConfigType<typeof JWTConfig>,
  ) {
    const strategy: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.acceptTokens.secret,
      passReqToCallback: true,
    };
    super(strategy);
  }

  validate(req: Request, paylod: any) {
    return paylod;
  }
}
