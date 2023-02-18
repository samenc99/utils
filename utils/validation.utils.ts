import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationUtils {
  static exceptionFactory(validationErrors: ValidationError[] = []) {
    const { constraints } = validationErrors[0];
    const keys = Object.keys(constraints);

    return new BadRequestException(constraints[keys[0]]);
  }
}
