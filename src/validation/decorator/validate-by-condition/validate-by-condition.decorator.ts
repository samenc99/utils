import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function ValidateByCondition(
  condition: (object: any, value: any) => boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ValidateByCondition',
      target: object.constructor,
      propertyName,
      constraints: [condition],
      options: validationOptions,
      validator: {
        validate(
          value: any,
          validationArguments?: ValidationArguments,
        ): Promise<boolean> | boolean {
          const [condition] = validationArguments.constraints;

          return condition(validationArguments.object, value);
        },
      },
    });
  };
}
