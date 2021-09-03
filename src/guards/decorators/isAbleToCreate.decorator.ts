import { SetMetadata } from '@nestjs/common';

export const IsAbleToCreate = (
  modelName: string,
  modelIdAttribute: string,
  roles: string[],
  attribute: string
) => SetMetadata('metaDataIsAbleToCreate', { modelName, modelIdAttribute, roles, attribute });
