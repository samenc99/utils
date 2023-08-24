import { Transform, TransformOptions } from 'class-transformer';

export default function ToNumber(
  defaultValue?: number,
  options?: TransformOptions,
) {
  return Transform(({ value }) => {
    const number = Number(value);

    if (isNaN(number)) {
      if (typeof defaultValue === 'undefined') {
        return undefined;
      }
      return defaultValue;
    }

    return number;
  }, options);
}
