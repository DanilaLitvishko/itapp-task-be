/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { BaseOutputDto } from '../../base/dto/base-output.dto';
import { User } from 'src/modules/common/entities/users/user.entity';

export class ContactUserResponseDto extends BaseOutputDto {
  constructor(user: User, chatroomId: number, chatroomName: string) {
    super();
    // this._id = user.id;
    // this.name = `${user.firstName} ${user.lastName}`;
    // this.avatar = user.avatar;
    this.chatroomId = chatroomId;
    this.chatroomName = chatroomName;
  }

  readonly _id: number;

  readonly name: string;

  readonly avatar: string;

  readonly chatroomId: number;

  readonly chatroomName: string;
}
