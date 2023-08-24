import {
  ClassConstructor,
  ClassTransformOptions,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Buffer } from 'buffer';

export class TransformUtils {
  static plainToInstance<T, V>(
    cls: ClassConstructor<T>,
    data: V[],
    options?: ClassTransformOptions,
  ): T[];
  static plainToInstance<T, V>(
    cls: ClassConstructor<T>,
    data: V,
    options?: ClassTransformOptions,
  ): T;
  static plainToInstance<T, V>(
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

  static instanceToPlain<T, V>(
    object: V[],
    options?: ClassTransformOptions,
  ): T[];
  static instanceToPlain<T, V>(object: V, options?: ClassTransformOptions): T;
  static instanceToPlain<T, V>(
    object: V | V[],
    options?: ClassTransformOptions,
  ): T | T[] {
    return instanceToPlain(object, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      ...options,
    }) as T | T[];
  }

  static btoa(toEncode: string) {
    return Buffer.from(toEncode).toString('base64');
  }

  static removeAllCharacters(value: string, characters: string[]) {
    for (const char of characters) {
      value = value.replaceAll(char, '');
    }

    return value;
  }
}
