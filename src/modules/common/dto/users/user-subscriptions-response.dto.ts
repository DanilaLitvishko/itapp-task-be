import { ApiResponseProperty } from '@nestjs/swagger';

import { BaseOutputDto } from 'src/modules/base/dto/base-output.dto';
import { User } from 'src/modules/common/entities/user.entity';
import { UserResponseDto } from 'src/modules/common/dto/users/user-response.dto';
import { UserSubscriptionResponseDto } from 'src/modules/common/dto/users/user-subscription-response.dto';

export class UserSubscriptionsResponseDto extends BaseOutputDto {
  constructor(user: User, subscriptions: UserSubscriptionResponseDto[]) {
    super();
    this.user = new UserResponseDto(user);
    this.subscriptions = subscriptions;
  }

  @ApiResponseProperty({ type: [UserSubscriptionResponseDto] })
  readonly subscriptions: UserSubscriptionResponseDto[];

  @ApiResponseProperty()
  readonly user: UserResponseDto;
}
