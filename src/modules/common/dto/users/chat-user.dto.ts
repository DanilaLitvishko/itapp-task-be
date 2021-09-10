/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { BaseOutputDto } from '../../base/dto/base-output.dto';
import { User } from 'src/modules/common/entities/users/user.entity';

export class ChatUserDto extends BaseOutputDto {
  constructor(user: User, isAdmin = false) {
    super();
    // this._id = user.id;
    // this.name = `${user.firstName} ${user.lastName}`;
    // this.avatar = user.avatar;
    // this.firstName = user.firstName;
    // this.lastName = user.lastName;
    this.email = user.email;
    this.isAdmin = isAdmin;
  }

  readonly _id: number;

  readonly name: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly avatar: string;

  readonly isAdmin: boolean;
}
