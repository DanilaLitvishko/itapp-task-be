import { ValidationErrorDto } from 'src/validation/dto/validation-error.dto';

export interface ValidationErrorsAndMessageAttributes {
  message: string;
  validationErrors?: ValidationErrorDto[];
}
