import { SetMetadata } from '@nestjs/common';

export const IsAbleToUpdate = (roles: string[], fieldsForUpdate: string[]) =>
  SetMetadata('metaDataIsAbleToUpdate', { roles, fieldsForUpdate });
