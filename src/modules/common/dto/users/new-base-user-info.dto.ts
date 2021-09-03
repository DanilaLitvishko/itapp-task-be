import { ApiResponseProperty } from '@nestjs/swagger';

import { User } from 'src/modules/common/entities/users/new-user.entity';

export class BaseUserInfoDto {
  constructor(user: User) {
    this.id = user.id;
    this.fullName = `${user.firstName} ${user.lastName}`;
    this.avatar = user.avatar || '';
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }

  @ApiResponseProperty()
  readonly id: number;

  @ApiResponseProperty()
  readonly fullName: string;

  @ApiResponseProperty()
  readonly firstName: string;

  @ApiResponseProperty()
  readonly lastName: string;

  @ApiResponseProperty()
  readonly avatar: string;

  @ApiResponseProperty()
  readonly email: string;
}
