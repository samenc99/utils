import { ValidateByCondition } from './validate-by-condition.decorator';
import { IsDate, validateSync } from 'class-validator';
import { extend } from '../../../extend';

extend();

describe('ValidateByCondition', () => {
  class Dto {
    @ValidateByCondition((object, value) => value.isBefore(object.end))
    @IsDate()
    init: Date;

    @IsDate()
    end: Date;
  }

  let dto: Dto;

  beforeEach(() => {
    dto = new Dto();
  });

  it('true', () => {
    dto.init = new Date().add(-1, 'day');
    dto.end = new Date();

    expect(validateSync(dto)).toEqual([]);
  });

  it('false', () => {
    dto.init = new Date().add(1, 'day');
    dto.end = new Date();

    expect(validateSync(dto).length).toBe(1);
  });

  it('order', () => {
    dto.init = 'string' as any;
    dto.end = new Date();

    expect(
      validateSync(dto, { stopAtFirstError: true })[0].constraints,
    ).toEqual({ isDate: 'init must be a Date instance' });
  });
});
