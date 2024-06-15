import { TransformOptions } from 'class-transformer/types/interfaces';
import { Transform } from 'class-transformer';

export const DateTime = (options?: TransformOptions) =>
  Transform(({ value }) => new Date(value), {
    toClassOnly: true,
    ...options,
  });
