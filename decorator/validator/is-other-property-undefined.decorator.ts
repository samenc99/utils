import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export default function IsOtherPropertyUndefined(
  otherPropertyName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsOtherPropertyUndefined',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [otherPropertyName],
      options: {
        message: `A propriedade ${otherPropertyName} não pode possuir valor válido quando '$property' possui`,
        ...validationOptions,
      },
      validator: {
        validate(
          value: any,
          validationArguments?: ValidationArguments,
        ): Promise<boolean> | boolean {
          return (
            (validationArguments.object as any)[otherPropertyName] === undefined
          );
        },
      },
    });
  };
}
