import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

import { ValidationException } from 'src/exceptions/custom-exceptions/validation-exeption';
import { SEQUELIZE_VALIDATION_ERROR_NAME } from 'constants/validation-messages';
import { ValidationErrorsAndMessageAttributes } from 'src/exceptions/interfaces/validation-errors-and-message.interface';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const validationErrors = this.createValidationErrorsObject(exception);

    return response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...validationErrors,
    });
  }

  createValidationErrorsObject = (exception: any) => {
    let validationErrorsAndMessage: ValidationErrorsAndMessageAttributes;

    if (exception instanceof ValidationException) {
      validationErrorsAndMessage = {
        message: exception.message || '',
        validationErrors: exception.getValidationErrors(),
      };
    } else if (exception.message.name === SEQUELIZE_VALIDATION_ERROR_NAME) {
      const responseValidationErrors = exception.message.errors.length
        ? exception.message.errors[0].original.validationErrors[0]
        : 0;
      const responseMessage = exception.message.errors.length
        ? exception.message.errors[0].original.message
        : '';
      const validationErrorsArray = new Array(responseValidationErrors);
      validationErrorsAndMessage = {
        message: responseMessage || '',
        validationErrors: validationErrorsArray,
      };
    } else {
      validationErrorsAndMessage = {
        message: exception.message || '',
      };
    }

    return validationErrorsAndMessage;
  };
}
