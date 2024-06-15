import { Transform } from 'class-transformer';
import { TransformOptions } from 'class-transformer/types/interfaces';

export const ToNumber = (options?: TransformOptions) =>
  Transform(({ value }) => Number(value), options);
