import { Transform, TransformOptions } from 'class-transformer';
import { isNilUtil } from '../../../util';

export const DefaultValue = (defaultValue: any, options?: TransformOptions) =>
  Transform(({ value }) => {
    if (isNilUtil(value)) {
      return defaultValue;
    }

    return value;
  }, options);
