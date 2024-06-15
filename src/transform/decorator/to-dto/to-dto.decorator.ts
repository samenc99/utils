import { ClassConstructor, Transform } from 'class-transformer';
import { TransformOptions } from 'class-transformer/types/interfaces';
import { TransformUtil } from '../../../util';
import { validateDtoSync } from '../../../validation';
import { isArray } from 'class-validator';

export const ToDto = (
  options?: TransformOptions,
  ...args: ClassConstructor<any>[]
) =>
  Transform(({ value }) => {
    const fromArray = isArray(value);

    if (!fromArray) {
      value = [value];
    }

    const values = [];

    value.forEach((v) => {
      for (const cls of args) {
        const dto = TransformUtil.plainToInstance(cls, v);

        try {
          validateDtoSync(dto);

          values.push(dto);
          return;
        } catch {}
      }

      values.push(v);
    });

    return fromArray ? values : values[0];
  }, options);
