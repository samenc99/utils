import { Transform, TransformOptions } from 'class-transformer';

export default function ToBoolean(
  callback: (value: any) => boolean,
  options?: TransformOptions,
) {
  return Transform(({ value }) => callback(value), options);
}
