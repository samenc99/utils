import { ClassConstructor } from 'class-transformer';
import { TransformUtil } from '../../util';
import { validateDtoSync } from '../decorator';
import { isArray } from 'class-validator';

export function isDtoValidation<T>(value: any, cls: ClassConstructor<T>) {
  const dto = TransformUtil.plainToInstance(cls, value);

  if (isArray(dto)) return false;

  try {
    validateDtoSync(dto);
    return true;
  } catch (err) {
    return false;
  }
}
