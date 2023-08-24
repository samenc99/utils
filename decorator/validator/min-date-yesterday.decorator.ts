import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export default function MinDateYesterday(
  skipDays?: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'MinDateYesterday',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [skipDays],
      options: {
        message: `A propriedade '$property' não pode ser inferior ao dia de hoje`,
        ...validationOptions,
      },
      validator: {
        validate(
          value: Date,
          validationArguments?: ValidationArguments,
        ): Promise<boolean> | boolean {
          const [skipDays] = validationArguments.constraints;
          const yesterday = new Date().startOf('day');

          if (skipDays) {
            yesterday.add(skipDays, 'day');
          }

          return yesterday.getTime() <= value.getTime();
        },
      },
    });
  };
}
