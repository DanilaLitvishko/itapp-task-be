import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  YOUR_ACCOUNT_HAS_BEEN_BLOCKED,
  ACCOUNT_IS_NOT_VERIFIED,
  TOKEN_EXPIRATION_ERROR_MESSAGE,
} from 'constants/messages';
import { UsersRepository } from '../repositories/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: any) {
    const { id, iat, exp } = payload;

    if (id) {
      const user: User = await this.usersRepository.findOne(id);

      if (user) {
        if (!user.isConfirm) {
          throw new HttpException(
            ACCOUNT_IS_NOT_VERIFIED,
            HttpStatus.FORBIDDEN,
          );
        }

        return user;
      }
    }
    return null;
  }
}
