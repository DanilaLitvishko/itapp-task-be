import { User } from 'src/modules/common/entities/users/user.entity';
import { USERS_REPOSITORY } from 'src/modules/common/constants/repositories';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
