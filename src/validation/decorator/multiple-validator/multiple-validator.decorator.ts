import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function MultipleValidator(
  validationOptions?: ValidationOptions,
  ...args: ((value: any) => boolean)[]
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'MultipleValidator',
      target: object.constructor,
      propertyName,
      constraints: [...args],
      options: {
        message:
          'A propriedade $property não está de acordo com os parâmetros estabelecidos',
        ...validationOptions,
      },
      validator: {
        validate(
          value: any,
          validationArguments?: ValidationArguments,
        ): Promise<boolean> | boolean {
          const args: ((value: any) => boolean)[] =
            validationArguments.constraints;

          return args.some((predicate) => predicate(value));
        },
      },
    });
  };
}
