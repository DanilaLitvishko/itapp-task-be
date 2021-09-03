import { BadRequestException } from '@nestjs/common';
import { ValidationErrorDto } from 'src/validation/dto/validation-error.dto';

export class ValidationException extends BadRequestException {
  private validationErrors;

  constructor(
    validationErrors: ValidationErrorDto[],
    message: string | object | any,
    error?: string
  ) {
    super(message, error);
    this.validationErrors = validationErrors;
  }

  public getValidationErrors() {
    return this.validationErrors;
  }
}
