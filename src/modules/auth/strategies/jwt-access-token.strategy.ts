import 'dotenv/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JWT_ACCESS_TOKEN_KEY } from '../constants';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtAccessTokenStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const { id, email } = payload;
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return { userId: id, email };
  }

  private static extractJWTFromCookie(req: Request): string | null {
    let accessToken = null;
    if (req.cookies && req.cookies[JWT_ACCESS_TOKEN_KEY]) {
      accessToken = req.cookies[JWT_ACCESS_TOKEN_KEY];
    }
    return accessToken;
  }
}
