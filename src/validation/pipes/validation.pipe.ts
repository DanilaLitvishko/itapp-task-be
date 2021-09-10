import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as _ from 'lodash';

import { ValidationErrorDto } from 'src/validation/dto/validation-error.dto';
import { ValidationException } from 'src/exceptions/custom-exceptions/validation-exeption';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(data: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return data;
    }

    const object = plainToClass(metatype, data, {
      excludeExtraneousValues: true,
    });
    const errors = await validate(object);
    const dataObject = _.pickBy(object, (value) => {
      return !_.isUndefined(value);
    });

    // if (errors.length > 0) {
    //   const validationErrors = this.parseValidationErrors(errors);

    //   throw new ValidationException(
    //     validationErrors,
    //     'Failed due to validation errors.',
    //   );
    // }
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private parseValidationErrors(
    errors: ValidationError[],
  ): ValidationErrorDto[] {
    return errors.map((error) => {
      const messages: string[] = [];

      if (error.constraints) {
        Object.keys(error.constraints).forEach((errorMessage) => {
          messages.push(error.constraints[errorMessage]);
        });
      }
      return new ValidationErrorDto(messages, error.property);
    });
  }
}
