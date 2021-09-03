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
import * as _ from 'lodash';
import { WhereOptions, Includeable } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { IsOwnerOrHasRoleMetaData } from 'src/guards/interfaces/isOwnerOrHasRoleMetaData.interface';
import { FIND_MODEL_ERROR_MESSAGE } from 'constants/messages';
import { userHasRole } from 'src/utils/auth.utils';

@Injectable()
export class IsOwnerOrHasRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metaData: IsOwnerOrHasRoleMetaData = this.reflector.get<IsOwnerOrHasRoleMetaData>(
      'metaDataIsOwnerOrHasRole',
      context.getHandler()
    );

    if (!metaData) {
      return true;
    }

    const { roles, attribute, modelName } = metaData;
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    const hasRole = userHasRole(user.roles, roles);

    let aliasModel = null;
    let modelWithoutAlias = modelName;

    if (modelName.indexOf('.') !== -1) {
      aliasModel = modelName.split('.').pop();
      modelWithoutAlias = modelName.substr(0, modelName.indexOf('.'));
    }

    const isOwner = async () => {
      const condition: WhereOptions = { id: params.id };
      const include: Includeable[] = aliasModel ? [aliasModel] : [];
      const model: any = await this.sequelize.model(modelWithoutAlias).findOne({
        where: condition,
        include,
      });

      if (!_.isEmpty(model)) {
        if (aliasModel) {
          return Number(model[aliasModel][attribute]) === user.id;
        }

        return Number(model[attribute]) === user.id;
      }

      throw new HttpException(FIND_MODEL_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
    };

    return (await isOwner()) || hasRole;
  }
}
