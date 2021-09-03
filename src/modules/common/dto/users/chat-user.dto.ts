/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { ApiResponseProperty } from '@nestjs/swagger';

import { BaseOutputDto } from 'src/modules/base/dto/base-output.dto';
import { User } from 'src/modules/common/entities/user.entity';

export class ChatUserDto extends BaseOutputDto {
  constructor(user: User, isAdmin = false) {
    super();
    this._id = user.id;
    this.name = `${user.firstName} ${user.lastName}`;
    this.avatar = user.avatar;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.isAdmin = isAdmin;
  }

  @ApiResponseProperty()
  readonly _id: number;

  @ApiResponseProperty()
  readonly name: string;

  @ApiResponseProperty()
  readonly firstName: string;

  @ApiResponseProperty()
  readonly lastName: string;

  @ApiResponseProperty()
  readonly email: string;

  @ApiResponseProperty()
  readonly avatar: string;

  @ApiResponseProperty()
  readonly isAdmin: boolean;
}
