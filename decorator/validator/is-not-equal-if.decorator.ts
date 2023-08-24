import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export default function IsNotEqualIf(
  valueEqual: any,
  condition: (object: any, value: any) => boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsNotEqualIf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [valueEqual, condition],
      options: {
        message: `A propriedade '$property' não pode ser igual a ${valueEqual}`,
        ...validationOptions,
      },
      validator: {
        validate(
          value: any,
          validationArguments?: ValidationArguments,
        ): Promise<boolean> | boolean {
          const [valueEqual, condition] = validationArguments.constraints;

          return condition(validationArguments.object, value)
            ? valueEqual !== value
            : true;
        },
      },
    });
  };
}
