import { UserResponseDto } from 'src/modules/common/dto/users/user-response.dto';

export class AuthResponseDto {
  constructor(accessToken: string, user: UserResponseDto, isFirstSignIn?: boolean) {
    this.accessToken = accessToken;
    this.user = user;
    this.isFirstSignIn = isFirstSignIn;
  }

  readonly accessToken: string;

  readonly isFirstSignIn: boolean;
  
  readonly user: UserResponseDto;
}
