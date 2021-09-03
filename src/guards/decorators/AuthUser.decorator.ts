import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, request) => {
  return request.user;
});
