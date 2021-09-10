// import { s3Providers } from 'src/modules/common/providers/s3/s3.provider';
import { usersProviders } from 'src/modules/common/providers/users/users.providers';
// import { databaseProviders } from 'src/modules/common/providers/database/database.providers';

export const providers = [
  // ...s3Providers,
  ...usersProviders,
  // ...databaseProviders,
];
