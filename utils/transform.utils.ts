import {
  ClassConstructor,
  ClassTransformOptions,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { parsePhoneNumber } from 'libphonenumber-js';

export class TransformUtils {
  static plainToInstance<T, V = any>(
    cls: ClassConstructor<T>,
    data: V | V[],
    options?: ClassTransformOptions,
  ): T | T[] {
    return plainToInstance<T, any>(cls, data, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      ...options,
    });
  }

  static instanceToPlain<T, V = any>(
    object: V | V[],
    options?: ClassTransformOptions,
  ): T | T[] {
    return instanceToPlain(object, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      ...options,
    }) as T | T[];
  }

  static formatPhone(phone: string) {
    return parsePhoneNumber(phone)?.format('E.164')?.slice(1);
  }
}
