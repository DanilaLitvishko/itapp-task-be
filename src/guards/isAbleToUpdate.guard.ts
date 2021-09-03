import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IsAbleToUpdateMetaData } from 'src/guards/interfaces/isAbleToUpdateMetaData.interface';

@Injectable()
export class IsAbleToUpdateGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metaData: IsAbleToUpdateMetaData = this.reflector.get<IsAbleToUpdateMetaData>(
      'metaDataIsAbleToUpdate',
      context.getHandler()
    );
    const request = context.switchToHttp().getRequest();
    const { user, body } = request;

    if (!metaData || user.roles.includes('admin')) {
      return true;
    }

    const { roles, fieldsForUpdate } = metaData;
    const isBodyNotValid = Object.keys(body).some(value => !fieldsForUpdate.includes(value));
    const isUserRolesValid = user.roles.some(value => roles.includes(value));

    if (!isBodyNotValid && isUserRolesValid) {
      return true;
    }

    return false;
  }
}
