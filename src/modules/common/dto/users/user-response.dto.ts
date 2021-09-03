import { IsBoolean, IsEmail, IsIn, IsNumber, IsString } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';

import { ROLE_ADMIN, ROLE_PREMIUM, ROLE_USER } from 'constants/roles';
import { User } from 'src/modules/common/entities/user.entity';
import { BaseOutputDto } from 'src/modules/base/dto/base-output.dto';

export class UserResponseDto extends BaseOutputDto {
  constructor(user: User) {
    super();
    this.id = user.id;
    this.email = user.email;
    this.login = user.login;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.roles = user.roles;
    this.isNew = user.isNew;
    this.isActive = user.isActive;
    this.phone = user.phone;
    this.stripeCustomerId = user.stripeCustomerId;
    this.ccLast4 = user.ccLast4;
    this.avatar = user.avatar;
  }

  @ApiResponseProperty()
  @IsNumber()
  readonly id: number;

  @ApiResponseProperty()
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;

  @ApiResponseProperty()
  @IsString()
  readonly login: string;

  @ApiResponseProperty()
  @IsString()
  readonly firstName: string;

  @ApiResponseProperty()
  @IsString()
  readonly lastName: string;

  @ApiResponseProperty()
  @IsString()
  readonly phone: string;

  @ApiResponseProperty()
  @IsString()
  readonly isActive: boolean;

  @ApiResponseProperty()
  @IsIn([ROLE_USER, ROLE_ADMIN, ROLE_PREMIUM])
  readonly roles: string[];

  @ApiResponseProperty()
  @IsBoolean()
  readonly isNew: boolean;

  @ApiResponseProperty()
  @IsString()
  readonly stripeCustomerId: string;

  @ApiResponseProperty()
  @IsString()
  readonly ccLast4: string;

  @ApiResponseProperty()
  @IsString()
  readonly avatar: string;
}
