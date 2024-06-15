import {
  ClassConstructor,
  ClassTransformOptions,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import camelcaseKeys from 'camelcase-keys';

export class TransformUtil {
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

  static serializeError(error: any) {
    return {
      message: error.message,
      status: error.status || error.statusCode || error.code,
      error: error.stack,
    };
  }

  static camelCase(data: any) {
    return camelcaseKeys(data, { deep: true });
  }
}
