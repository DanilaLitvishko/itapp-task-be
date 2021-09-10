import { BaseOutputDto } from '../../base/dto/base-output.dto';
import { User } from 'src/modules/common/entities/users/user.entity';

export class BaseUserInfoDto extends BaseOutputDto {
  constructor(user: User) {
    super();
    // this.id = user.id;
    // this.fullName = `${user.firstName} ${user.lastName}`;
    // this.avatar = user.avatar || '';
    // this.firstName = user.firstName;
    // this.lastName = user.lastName;
  }

  readonly id: number;

  readonly fullName: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly avatar: string;
}
