import { Transform, TransformOptions } from 'class-transformer';

export default function DefaultValue(
  defaultValue: any,
  options?: TransformOptions,
) {
  return Transform(({ value }) => {
    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }, options);
}
