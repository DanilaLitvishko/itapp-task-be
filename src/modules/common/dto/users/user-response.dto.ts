import { IsBoolean, IsEmail, IsIn, IsNumber, IsString } from 'class-validator';

import { ROLE_ADMIN, ROLE_PREMIUM, ROLE_USER } from 'constants/roles';
import { User } from 'src/modules/common/entities/users/user.entity';
import { BaseOutputDto } from '../../base/dto/base-output.dto';

export class UserResponseDto extends BaseOutputDto {
  constructor(user: User) {
    super();
    this.id = user.id;
    this.email = user.email;
    // this.login = user.login;
    // this.firstName = user.firstName;
    // this.lastName = user.lastName;
    // this.roles = user.roles;
    // this.isNew = user.isNew;
    // this.isActive = user.isActive;
    // this.phone = user.phone;
    // this.stripeCustomerId = user.stripeCustomerId;
    // this.ccLast4 = user.ccLast4;
    // this.avatar = user.avatar;
  }

  @IsString()
  readonly id: string;

  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;

  @IsString()
  readonly login: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly isActive: boolean;

  @IsIn([ROLE_USER, ROLE_ADMIN, ROLE_PREMIUM])
  readonly roles: string[];

  @IsBoolean()
  readonly isNew: boolean;

  @IsString()
  readonly stripeCustomerId: string;

  @IsString()
  readonly ccLast4: string;

  @IsString()
  readonly avatar: string;
}
