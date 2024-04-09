import 'dotenv/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JWT_ACCESS_TOKEN_KEY } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }

  private static extractJWTFromCookie(req: Request): string | null {
    let accessToken = null;
    if (req.cookies && req.cookies[JWT_ACCESS_TOKEN_KEY]) {
      accessToken = req.cookies[JWT_ACCESS_TOKEN_KEY];
    }
    return accessToken;
  }
}
