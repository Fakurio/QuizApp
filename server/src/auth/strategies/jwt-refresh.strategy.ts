import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

const cookieExtractor = (request: Request) => {
  let token = null;
  if (request && request.cookies) {
    token = request.cookies['refresh_token'];
  }
  return token;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToken = request.cookies['refresh_token'];
    const user = await this.authService.validateJwtRefreshUser(
      payload.sub,
      refreshToken,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
