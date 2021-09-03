import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'arrayHasAnyValues', async: false })
export class ArrayHasAnyValues implements ValidatorConstraintInterface {
  validate(array: string[], args: ValidationArguments) {
    const { constraints } = args;
    let isValid = false;
    array.map((value) => {
      isValid = constraints.includes(value);
      return value;
    });
    return isValid; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    const { constraints, property } = args;
    return `${property} must include any of the following values: ${constraints.join(',')}`;
  }
}
