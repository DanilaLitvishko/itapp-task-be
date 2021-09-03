import { ApiResponseProperty } from '@nestjs/swagger';

import { UserResponseDto } from 'src/modules/common/dto/users/user-response.dto';

export class AuthResponseDto {
  constructor(accessToken: string, user: UserResponseDto, isFirstSignIn?: boolean) {
    this.accessToken = accessToken;
    this.user = user;
    this.isFirstSignIn = isFirstSignIn;
  }

  @ApiResponseProperty()
  readonly accessToken: string;

  @ApiResponseProperty()
  readonly isFirstSignIn: boolean;

  @ApiResponseProperty()
  readonly user: UserResponseDto;
}
