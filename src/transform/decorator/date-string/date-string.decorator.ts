import { Transform } from 'class-transformer';
import { TransformOptions } from 'class-transformer/types/interfaces';
import '../../../extend/date/date.extend';

export const DateString = (format = 'YYYY-MM-DD', options?: TransformOptions) =>
  Transform(({ value }: { value: Date }) => value.format(format), {
    toPlainOnly: true,
    ...options,
  });
