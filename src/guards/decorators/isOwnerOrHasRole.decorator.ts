import { SetMetadata } from '@nestjs/common';

export const IsOwnerOrHasRole = (modelName: string, roles: string[], attribute: string) =>
  SetMetadata('metaDataIsOwnerOrHasRole', { modelName, roles, attribute });
