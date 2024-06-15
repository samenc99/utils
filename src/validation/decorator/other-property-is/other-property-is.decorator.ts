import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function OtherPropertyIs<T>(
  otherPropertyName: keyof T,
  is: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsOtherPropertyUndefined',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [otherPropertyName],
      options: {
        message: `A propriedade ${
          otherPropertyName as string
        } deve possuir valor '${is}' quando '$property' possui valor definido`,
        ...validationOptions,
      },
      validator: {
        validate(
          value: any,
          validationArguments?: ValidationArguments,
        ): Promise<boolean> | boolean {
          return (validationArguments.object as any)[otherPropertyName] === is;
        },
      },
    });
  };
}
