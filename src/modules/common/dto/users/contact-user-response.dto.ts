/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { ApiResponseProperty } from '@nestjs/swagger';

import { BaseOutputDto } from 'src/modules/base/dto/base-output.dto';
import { User } from 'src/modules/common/entities/user.entity';

export class ContactUserResponseDto extends BaseOutputDto {
  constructor(user: User, chatroomId: number, chatroomName: string) {
    super();
    this._id = user.id;
    this.name = `${user.firstName} ${user.lastName}`;
    this.avatar = user.avatar;
    this.chatroomId = chatroomId;
    this.chatroomName = chatroomName;
  }

  @ApiResponseProperty()
  readonly _id: number;

  @ApiResponseProperty()
  readonly name: string;

  @ApiResponseProperty()
  readonly avatar: string;

  @ApiResponseProperty()
  readonly chatroomId: number;

  @ApiResponseProperty()
  readonly chatroomName: string;
}
