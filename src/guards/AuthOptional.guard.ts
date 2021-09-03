import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthOptionalGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    return user;
  }
}
