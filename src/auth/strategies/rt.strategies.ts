import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { JWTConfig } from '../config';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(JWTConfig.KEY)
    private readonly configService: ConfigType<typeof JWTConfig>,
  ) {
    const strategy: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.refreshToken.secret,
      passReqToCallback: true,
    };
    super(strategy);
  }

  validate(req: Request, paylod: any) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return { ...paylod, refreshToken };
  }
}
