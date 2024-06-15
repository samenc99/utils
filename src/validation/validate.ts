import {
  validate as validateClassValidator,
  ValidationError,
} from 'class-validator';
import { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions';
import { BadRequestException } from '@nestjs/common';

export async function validate(dto: object, options?: ValidatorOptions) {
  const errors = await validateClassValidator(dto, options);

  if (!errors.length) return;

  const errorMessage = (
    { constraints, children }: ValidationError,
    property: string,
  ) => {
    if (children.length) {
      return errorMessage(children[0], `${property}.${children[0].property}`);
    }

    const keys = Object.keys(constraints);
    return `${property} - ${constraints[keys[0]]}`;
  };

  const message = errorMessage(errors[0], errors[0].property);

  throw new BadRequestException(message);
}
