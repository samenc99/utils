import { Transform, TransformOptions } from 'class-transformer';
import { isNil } from '../../is-nil/is-nil.utils';

export default function DefaultValue(
  defaultValue: any,
  options?: TransformOptions,
) {
  return Transform(({ value }) => {
    if (isNil(value)) {
      return defaultValue;
    }

    return value;
  }, options);
}
