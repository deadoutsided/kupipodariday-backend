import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
//import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    //private configService: ConfigService,
    private usersServise: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.jwt_secret,
      //secretOrKey: this.configService.get<string>('jwt_secret'), calls a ts error 17009
    });
  }

  async validate(jwtPayload: { sub: number }) {
    const user = this.usersServise.findOneById(jwtPayload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
