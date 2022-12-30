import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'rt-secret',
  passReqToCallback: true,
};

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super(options);
  }

  validate(req: Request, paylod: any) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return { ...paylod, refreshToken };
  }
}
