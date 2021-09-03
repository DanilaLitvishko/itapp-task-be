import { ApiResponseProperty } from '@nestjs/swagger';

import { BaseOutputDto } from 'src/modules/base/dto/base-output.dto';
import { User } from 'src/modules/common/entities/user.entity';

export class BaseUserInfoDto extends BaseOutputDto {
  constructor(user: User) {
    super();
    this.id = user.id;
    this.fullName = `${user.firstName} ${user.lastName}`;
    this.avatar = user.avatar || '';
    this.firstName = user.firstName;
    this.lastName = user.lastName;
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
}
