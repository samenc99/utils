import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { DateManipulationUtils } from '../utils/date-manipulation.utils';

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
          const yesterday = DateManipulationUtils.toZeroHour(new Date());

          if (skipDays) {
            yesterday.setDate(yesterday.getDate() + skipDays);
          }

          return yesterday.getTime() <= value.getTime();
        },
      },
    });
  };
}
