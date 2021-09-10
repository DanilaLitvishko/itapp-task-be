/* eslint-disable no-unused-expressions */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WhereOptions } from 'sequelize';
import * as _ from 'lodash';

import { FIND_MODEL_ERROR_MESSAGE } from 'constants/messages';
import { IsAbleToCreateMetaData } from 'src/guards/interfaces/isAbleToCreateMetaData.interface';
import { userHasRole } from 'src/utils/auth.utils';

@Injectable()
export class IsAbleToCreateGuard /*implements CanActivate*/ {
  constructor(private readonly reflector: Reflector) {}

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const metaData: IsAbleToCreateMetaData = this.reflector.get<IsAbleToCreateMetaData>(
  //     'metaDataIsAbleToCreate',
  //     context.getHandler()
  //   );

  //   if (!metaData) {
  //     return true;
  //   }

  //   const request = context.switchToHttp().getRequest();
  //   const { user, body } = request;
  //   const { modelName, modelIdAttribute, roles, attribute } = metaData;

  //   const hasRole = userHasRole(user.roles, roles);

  //   const isCanCreate = async () => {
  //     const condition: WhereOptions = { id: body[modelIdAttribute] };
  //     const model: any = await this.sequelize.model(modelName).findOne({ where: condition });
  //     if (!_.isEmpty(model)) {
  //       return model[attribute] === user.id;
  //     }
  //     throw new HttpException(FIND_MODEL_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
  //   };

  //   return isCanCreate() || hasRole;
  // }
}
