import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  auth(user: User) {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    /* В идеальном случае пароль обязательно должен быть захэширован */
    const hashesCompare = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (user && hashesCompare) {
      /* Исключаем пароль из результата */
      const { password, ...result } = user;

      return result;
    }

    //throw new UnauthorizedException();
    return null;
  }
}
