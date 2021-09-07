import { BaseOutputDto } from 'src/modules/base/dto/base-output.dto';
import { ContactUserResponseDto } from 'src/modules/common/dto/users/contact-user-response.dto';
import { ChatUserDto } from 'src/modules/common/dto/users/chat-user.dto';

export class UserSearchResponseDto extends BaseOutputDto {
  constructor(contacts: ContactUserResponseDto[], allUsers: ChatUserDto[]) {
    super();
    this.contacts = contacts;
    this.users = allUsers;
  }

  readonly contacts: ContactUserResponseDto[];

  readonly users: ChatUserDto[];
}
