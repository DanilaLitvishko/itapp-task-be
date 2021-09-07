import { Sequelize } from 'sequelize-typescript';

import { database } from '../modules/common/providers/database/database.providers';
import { ValidationException } from 'src/exceptions/custom-exceptions/validation-exeption';
import { ValidationErrorDto } from 'src/validation/dto/validation-error.dto';
import { FAILED_DUE_TO_VALIDATION_ERRORS } from 'constants/messages';
import { titleCase } from 'title-case';

export const isUnique = async (
  recordId: number,
  fieldValue: number | string,
  modelName: string,
  attribute: string
) => {
  const sequelize: Sequelize = await database();
  const existingRecord = await sequelize
    .model(modelName)
    .findOne({ where: { [attribute]: fieldValue } });

  if (existingRecord && existingRecord.id !== recordId) {
    throw new ValidationException(
      [new ValidationErrorDto([`${titleCase(attribute)} is not unique`], attribute)],
      FAILED_DUE_TO_VALIDATION_ERRORS
    );
  }
};
