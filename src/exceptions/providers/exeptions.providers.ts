import { APP_FILTER } from '@nestjs/core';

import { AllExceptionFilter } from 'src/exceptions/filters/all-exeptions.filter';

export const exceptionsProviders = [
  {
    provide: APP_FILTER,
    useClass: AllExceptionFilter,
  },
];
