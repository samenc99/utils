import './date.extend';
import { TUnit, TUnitLongPlural } from './date.extend';
import { beforeEach, expect } from '@jest/globals';

describe('DateExtend', () => {
  const millisecond = 1;
  const second = millisecond * 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month31 = day * 31;
  const year = day * 365;

  describe('add', () => {
    const values: Record<
      Exclude<TUnit, TUnitLongPlural | 'year' | 'month'>,
      number
    > = {
      millisecond,
      second,
      minute,
      hour,
      day,
      week,
    };

    let date: Date;

    beforeEach(() => {
      date = new Date();
    });

    it('mutate', () => {
      const value = date.clone();
      date.add(1);

      expect(value.getTime()).not.toEqual(date.getTime());
    });

    it('+1', () => {
      for (const key in values) {
        expect(
          date
            .clone()
            .add(1, key as TUnit)
            .getTime(),
        ).toEqual(date.getTime() + values[key]);
      }

      const date2 = new Date('2023-01-01');

      expect(date2.clone().add(1, 'month').getTime()).toEqual(
        date2.getTime() + 1000 * 3600 * 24 * 31,
      );

      expect(date2.clone().add(1, 'year').getTime()).toEqual(
        date2.getTime() + 1000 * 3600 * 24 * 365,
      );
    });

    it('-1', () => {
      for (const key in values) {
        expect(
          date
            .clone()
            .add(-1, key as TUnit)
            .getTime(),
        ).toEqual(date.getTime() - values[key]);
      }

      const date2 = new Date('2023-01-01');

      expect(date2.clone().add(-1, 'month').getTime()).toEqual(
        date2.getTime() - month31,
      );

      expect(date2.clone().add(-1, 'year').getTime()).toEqual(
        date2.getTime() - year,
      );
    });

    it('+1.5', () => {
      for (const key in values) {
        expect(
          date
            .clone()
            .add(1, key as TUnit)
            .getTime(),
        ).toEqual(date.getTime() + values[key]);
      }

      const date2 = new Date('2023-01-01');

      expect(date2.clone().add(1, 'month').getTime()).toEqual(
        date2.getTime() + 1000 * 3600 * 24 * 31,
      );

      expect(date2.clone().add(1, 'year').getTime()).toEqual(
        date2.getTime() + 1000 * 3600 * 24 * 365,
      );
    });

    it('-1.5', () => {
      for (const key in values) {
        expect(
          date
            .clone()
            .add(-1, key as TUnit)
            .getTime(),
        ).toEqual(date.getTime() - values[key]);
      }

      const date2 = new Date('2023-01-01');

      expect(date2.clone().add(-1, 'month').getTime()).toEqual(
        date2.getTime() - month31,
      );

      expect(date2.clone().add(-1, 'year').getTime()).toEqual(
        date2.getTime() - year,
      );
    });
  });

  describe('clone', () => {
    it('ok', () => {
      const date = new Date();
      const date1 = date.clone().add(1, 'day');

      expect(date.getTime()).not.toEqual(date1.getTime());
    });
  });

  describe('diff', () => {
    let date: Date;

    beforeEach(() => {
      date = new Date('2022-01-01');
    });

    it('millisecond', () => {
      expect(
        date.diff(date.clone().add(1, 'millisecond'), 'millisecond'),
      ).toEqual(-1);

      expect(
        date.diff(date.clone().add(-1, 'millisecond'), 'millisecond'),
      ).toEqual(1);
    });

    it('second', () => {
      expect(date.diff(date.clone().add(1, 'second'), 'second')).toEqual(-1);

      expect(date.diff(date.clone().add(-1, 'second'), 'second')).toEqual(1);

      expect(date.diff(date.clone().add(1, 'millisecond'), 'second')).toEqual(
        0,
      );

      expect(date.diff(date.clone().add(999, 'millisecond'), 'second')).toEqual(
        0,
      );

      expect(
        date.diff(date.clone().add(1001, 'millisecond'), 'second'),
      ).toEqual(-1);

      expect(
        date.diff(date.clone().add(1999, 'millisecond'), 'second'),
      ).toEqual(-1);

      expect(date.diff(date.clone().add(-1, 'millisecond'), 'second')).toEqual(
        0,
      );

      expect(
        date.diff(date.clone().add(-999, 'millisecond'), 'second'),
      ).toEqual(0);

      expect(
        date.diff(date.clone().add(-1001, 'millisecond'), 'second'),
      ).toEqual(1);

      expect(
        date.diff(date.clone().add(-1999, 'millisecond'), 'second'),
      ).toEqual(1);

      expect(
        date.diff(date.clone().add(1, 'millisecond'), 'second', true),
      ).toEqual(-0.001);

      expect(
        date.diff(date.clone().add(999, 'millisecond'), 'second', true),
      ).toEqual(-0.999);

      expect(
        date.diff(date.clone().add(-1, 'millisecond'), 'second', true),
      ).toEqual(0.001);

      expect(
        date.diff(date.clone().add(-999, 'millisecond'), 'second', true),
      ).toEqual(0.999);
    });

    it('minute', () => {
      expect(date.diff(date.clone().add(1, 'minute'), 'minute')).toEqual(-1);

      expect(date.diff(date.clone().add(-1, 'minute'), 'minute')).toEqual(1);

      expect(date.diff(date.clone().add(1, 'second'), 'minute')).toEqual(0);

      expect(date.diff(date.clone().add(59, 'second'), 'minute')).toEqual(0);

      expect(date.diff(date.clone().add(61, 'second'), 'minute')).toEqual(-1);

      expect(date.diff(date.clone().add(119, 'second'), 'minute')).toEqual(-1);

      expect(date.diff(date.clone().add(-1, 'second'), 'minute')).toEqual(0);

      expect(date.diff(date.clone().add(-59, 'second'), 'minute')).toEqual(0);

      expect(date.diff(date.clone().add(-61, 'second'), 'minute')).toEqual(1);

      expect(date.diff(date.clone().add(-119, 'second'), 'minute')).toEqual(1);

      expect(date.diff(date.clone().add(15, 'second'), 'minute', true)).toEqual(
        -0.25,
      );

      expect(date.diff(date.clone().add(45, 'second'), 'minute', true)).toEqual(
        -0.75,
      );

      expect(
        date.diff(date.clone().add(-15, 'second'), 'minute', true),
      ).toEqual(0.25);

      expect(
        date.diff(date.clone().add(-45, 'second'), 'minute', true),
      ).toEqual(0.75);
    });

    it('hour', () => {
      expect(date.diff(date.clone().add(1, 'hour'), 'hour')).toEqual(-1);

      expect(date.diff(date.clone().add(-1, 'hour'), 'hour')).toEqual(1);

      expect(date.diff(date.clone().add(1, 'minute'), 'hour')).toEqual(0);

      expect(date.diff(date.clone().add(59, 'minute'), 'hour')).toEqual(0);

      expect(date.diff(date.clone().add(-1, 'minute'), 'hour')).toEqual(0);

      expect(date.diff(date.clone().add(-59, 'minute'), 'hour')).toEqual(0);

      expect(date.diff(date.clone().add(15, 'minute'), 'hour', true)).toEqual(
        -0.25,
      );

      expect(date.diff(date.clone().add(45, 'minute'), 'hour', true)).toEqual(
        -0.75,
      );

      expect(date.diff(date.clone().add(-15, 'minute'), 'hour', true)).toEqual(
        0.25,
      );

      expect(date.diff(date.clone().add(-45, 'minute'), 'hour', true)).toEqual(
        0.75,
      );
    });

    it('day', () => {
      expect(date.diff(date.clone().add(1, 'day'), 'day')).toEqual(-1);

      expect(date.diff(date.clone().add(-1, 'day'), 'day')).toEqual(1);

      expect(date.diff(date.clone().add(1, 'hour'), 'day')).toEqual(0);

      expect(date.diff(date.clone().add(23, 'hour'), 'day')).toEqual(0);

      expect(date.diff(date.clone().add(-1, 'hour'), 'day')).toEqual(0);

      expect(date.diff(date.clone().add(-23, 'hour'), 'day')).toEqual(0);

      expect(date.diff(date.clone().add(6, 'hour'), 'day', true)).toEqual(
        -0.25,
      );

      expect(date.diff(date.clone().add(18, 'hour'), 'day', true)).toEqual(
        -0.75,
      );

      expect(date.diff(date.clone().add(-6, 'hour'), 'day', true)).toEqual(
        0.25,
      );

      expect(date.diff(date.clone().add(-18, 'hour'), 'day', true)).toEqual(
        0.75,
      );
    });

    it('week', () => {
      expect(date.diff(date.clone().add(1, 'week'), 'week')).toEqual(-1);

      expect(date.diff(date.clone().add(-1, 'week'), 'week')).toEqual(1);

      expect(date.diff(date.clone().add(1, 'day'), 'week')).toEqual(0);

      expect(date.diff(date.clone().add(6, 'day'), 'week')).toEqual(0);

      expect(date.diff(date.clone().add(-1, 'day'), 'week')).toEqual(0);

      expect(date.diff(date.clone().add(-6, 'day'), 'week')).toEqual(0);

      expect(
        date.diff(date.clone().add(1, 'day'), 'week', true).toFixed(2),
      ).toEqual('-0.14');

      expect(
        date.diff(date.clone().add(6, 'day'), 'week', true).toFixed(2),
      ).toEqual('-0.86');

      expect(
        date.diff(date.clone().add(-1, 'day'), 'week', true).toFixed(2),
      ).toEqual('0.14');

      expect(
        date.diff(date.clone().add(-6, 'day'), 'week', true).toFixed(2),
      ).toEqual('0.86');
    });

    it('month', () => {
      expect(date.diff(date.clone().add(1, 'month'), 'month')).toEqual(-1);

      expect(date.diff(date.clone().add(-1, 'month'), 'month')).toEqual(1);

      expect(date.diff(date.clone().add(1, 'week'), 'month')).toEqual(0);

      expect(date.diff(date.clone().add(4, 'week'), 'month')).toEqual(0);

      expect(date.diff(date.clone().add(-1, 'week'), 'month')).toEqual(0);

      expect(date.diff(date.clone().add(-4, 'week'), 'month')).toEqual(0);

      expect(
        date.diff(date.clone().add(1, 'week'), 'month', true).toFixed(2),
      ).toEqual('-0.23');

      expect(
        date.diff(date.clone().add(4, 'week'), 'month', true).toFixed(2),
      ).toEqual('-0.90');

      expect(
        date.diff(date.clone().add(-1, 'week'), 'month', true).toFixed(2),
      ).toEqual('0.23');

      expect(
        date.diff(date.clone().add(-4, 'week'), 'month', true).toFixed(2),
      ).toEqual('0.90');
    });

    it('year', () => {
      expect(date.diff(date.clone().add(1, 'year'), 'year')).toEqual(-1);

      expect(date.diff(date.clone().add(-1, 'year'), 'year')).toEqual(1);

      expect(date.diff(date.clone().add(1, 'month'), 'year')).toEqual(0);

      expect(date.diff(date.clone().add(11, 'month'), 'year')).toEqual(0);

      expect(date.diff(date.clone().add(-1, 'month'), 'year')).toEqual(0);

      expect(date.diff(date.clone().add(-11, 'month'), 'year')).toEqual(0);

      expect(
        date.diff(date.clone().add(1, 'month'), 'year', true).toFixed(2),
      ).toEqual('-0.08');

      expect(
        date.diff(date.clone().add(11, 'month'), 'year', true).toFixed(2),
      ).toEqual('-0.92');

      expect(
        date.diff(date.clone().add(-1, 'month'), 'year', true).toFixed(2),
      ).toEqual('0.08');

      expect(
        date.diff(date.clone().add(-11, 'month'), 'year', true).toFixed(2),
      ).toEqual('0.92');
    });
  });

  describe('endOf', () => {
    const date = new Date('2023-01-01T12:30:30.500');

    it('second', () => {
      expect(date.clone().endOf('second').getTime()).toBe(
        new Date('2023-01-01T12:30:30.999').getTime(),
      );
    });

    it('minute', () => {
      expect(date.clone().endOf('minute').getTime()).toBe(
        new Date('2023-01-01T12:30:59.999').getTime(),
      );
    });

    it('hour', () => {
      expect(date.clone().endOf('hour').getTime()).toBe(
        new Date('2023-01-01T12:59:59.999').getTime(),
      );
    });

    it('day', () => {
      expect(date.clone().endOf('day').getTime()).toBe(
        new Date('2023-01-01T23:59:59.999').getTime(),
      );
    });

    it('week', () => {
      expect(date.clone().endOf('week').getTime()).toBe(
        new Date('2023-01-07T23:59:59.999').getTime(),
      );
    });

    it('month', () => {
      expect(date.clone().endOf('month').getTime()).toBe(
        new Date('2023-01-31T23:59:59.999').getTime(),
      );
    });

    it('year', () => {
      expect(date.clone().endOf('year').getTime()).toBe(
        new Date('2023-12-31T23:59:59.999').getTime(),
      );
    });
  });

  describe('format', () => {
    const date = new Date('2023-01-01T05:06:07.500');

    const tests = [
      ['YYYY-MM-DDTHH:mm:ss.SSS', '2023-01-01T05:06:07.500'],
      ['YY', '23'],
      ['YYYY', '2023'],
      ['M', '1'],
      ['MM', '01'],
      ['MMM', 'Jan'],
      ['MMMM', 'January'],
      ['D', '1'],
      ['DD', '01'],
      ['d', '0'],
      ['dd', 'Su'],
      ['H', '5'],
      ['HH', '05'],
      ['h', '5'],
      ['hh', '05'],
      ['m', '6'],
      ['mm', '06'],
      ['s', '7'],
      ['ss', '07'],
      ['SSS', '500'],
      ['A', 'AM'],
      ['a', 'am'],
    ];

    it('tests', () => {
      for (const [template, expected] of tests) {
        expect(date.format(template)).toBe(expected);
      }
    });
  });

  describe('formatOnlyDate', () => {
    const date = new Date('2023-01-01T05:06:07.500');

    expect(date.formatOnlyDate()).toBe('2023-01-01');
  });

  describe('formatOnlyTime', () => {
    const date = new Date('2023-01-01T22:06:07.500');

    const tests = [
      [undefined, '22:06'],
      ['HH:mm', '22:06'],
      ['HH:mm:ss', '22:06:07'],
      ['HH:mm:ss.SSS', '22:06:07.500'],
      ['hh:mm', '10:06'],
      ['hh:mm:ss', '10:06:07'],
      ['hh:mm:ss.SSS', '10:06:07.500'],
    ];

    it('tests', () => {
      for (const [template, expected] of tests) {
        expect(date.formatOnlyTime(template as any)).toBe(expected);
      }
    });
  });

  describe('formatWithoutTimezone', () => {
    const date = new Date('2023-01-01T05:06:07.500');

    expect(date.formatWithoutTimezone()).toBe('2023-01-01 05:06:07');
  });

  describe('isAfter', () => {
    const date1 = new Date('2023-01-01T00:00:00.000');
    const date2 = new Date('2023-01-01T00:00:00.000');

    const tests: [Date, Date, TUnit, boolean][] = [
      [date1, date2, 'millisecond', false],
      [date1, date2.clone().add(-1, 'millisecond'), 'millisecond', false],
      [date1, date2.clone().add(1, 'millisecond'), 'millisecond', true],
      [date1, date2.clone().add(999, 'millisecond'), 'second', false],
      [date1, date2.clone().add(1, 'second'), 'second', true],
      [date1, date2.clone().add(59, 'second'), 'minute', false],
      [date1, date2.clone().add(1, 'minute'), 'minute', true],
      [date1, date2.clone().add(59, 'minute'), 'hour', false],
      [date1, date2.clone().add(1, 'hour'), 'hour', true],
      [date1, date2.clone().add(23, 'hour'), 'day', false],
      [date1, date2.clone().add(1, 'day'), 'day', true],
      [date1, date2.clone().add(6, 'day'), 'week', false],
      [date1, date2.clone().add(1, 'week'), 'week', true],
      [date1, date2.clone().add(4, 'week'), 'month', false],
      [date1, date2.clone().add(1, 'month'), 'month', true],
      [date1, date2.clone().add(11, 'month'), 'year', false],
      [date1, date2.clone().add(1, 'year'), 'year', true],
    ];

    it('tests', () => {
      for (const [d1, d2, unit, expected] of tests) {
        expect(d2.isAfter(d1, unit)).toBe(expected);
      }
    });
  });

  describe('isAfterOrEqual', () => {
    const date1 = new Date('2023-01-01T00:00:00.000');
    const date2 = new Date('2023-01-01T00:00:00.000');

    const tests: [Date, Date, TUnit, boolean][] = [
      [date1, date2.clone().add(-1, 'millisecond'), 'millisecond', false],
      [date1, date2.clone(), 'millisecond', true],
      [date1, date2.clone().add(1, 'millisecond'), 'millisecond', true],
    ];

    it('tests', () => {
      for (const [d1, d2, unit, expected] of tests) {
        expect(d2.isAfterOrEqual(d1, unit)).toBe(expected);
      }
    });
  });

  describe('isBefore', () => {
    const date1 = new Date('2023-12-31T23:59:59.999');
    const date2 = new Date('2023-12-31T23:59:59.999');

    const tests: [Date, Date, TUnit, boolean][] = [
      [date1, date2, 'millisecond', false],
      [date1, date2.clone().add(1, 'millisecond'), 'millisecond', false],
      [date1, date2.clone().add(-1, 'millisecond'), 'millisecond', true],
      [date1, date2.clone().add(-999, 'millisecond'), 'second', false],
      [date1, date2.clone().add(-1, 'second'), 'second', true],
      [date1, date2.clone().add(-59, 'second'), 'minute', false],
      [date1, date2.clone().add(-1, 'minute'), 'minute', true],
      [date1, date2.clone().add(-59, 'minute'), 'hour', false],
      [date1, date2.clone().add(-1, 'hour'), 'hour', true],
      [date1, date2.clone().add(-23, 'hour'), 'day', false],
      [date1, date2.clone().add(-1, 'day'), 'day', true],
      [
        date1.clone().endOf('week'),
        date2.clone().endOf('week').add(-6, 'day'),
        'week',
        false,
      ],
      [date1, date2.clone().add(-1, 'week'), 'week', true],
      [date1, date2.clone().add(-4, 'week'), 'month', false],
      [date1, date2.clone().add(-1, 'month'), 'month', true],
      [date1, date2.clone().add(-11, 'month'), 'year', false],
      [date1, date2.clone().add(-1, 'year'), 'year', true],
    ];

    it('tests', () => {
      for (const [d1, d2, unit, expected] of tests) {
        expect(d2.isBefore(d1, unit)).toBe(expected);
      }
    });
  });

  describe('isBeforeOrEqual', () => {
    const date1 = new Date('2023-12-31T23:59:59.999');
    const date2 = new Date('2023-12-31T23:59:59.999');

    const tests: [Date, Date, TUnit, boolean][] = [
      [date1, date2.clone().add(1, 'millisecond'), 'millisecond', false],
      [date1, date2.clone(), 'millisecond', true],
      [date1, date2.clone().add(-1, 'millisecond'), 'millisecond', true],
    ];

    it('tests', () => {
      for (const [d1, d2, unit, expected] of tests) {
        expect(d2.isBeforeOrEqual(d1, unit)).toBe(expected);
      }
    });
  });

  describe('isSame', () => {
    const date1 = new Date('2023-01-01T00:00:00.000');
    const date2 = new Date('2023-01-01T00:00:00.000');

    const tests: [Date, Date, TUnit, boolean][] = [
      [date1, date2.clone().add(1, 'millisecond'), 'millisecond', false],
      [date1, date2.clone(), 'millisecond', true],
      [date1, date2.clone().add(-1, 'millisecond'), 'millisecond', false],
      [date1, date2.clone().add(1, 'millisecond'), 'second', true],
      [date1, date2.clone().add(1, 'second'), 'minute', true],
      [date1, date2.clone().add(1, 'minute'), 'hour', true],
      [date1, date2.clone().add(1, 'hour'), 'day', true],
      [date1, date2.clone().add(1, 'day'), 'week', true],
      [date1, date2.clone().add(1, 'week'), 'month', true],
      [date1, date2.clone().add(1, 'month'), 'year', true],
      [date1, date2.clone().add(1, 'year'), 'year', false],
    ];

    it('tests', () => {
      for (const [d1, d2, unit, expected] of tests) {
        expect(d2.isSame(d1, unit)).toBe(expected);
      }
    });
  });

  describe('set', () => {
    const date = new Date('2023-01-03T12:30:30.500');

    it('millisecond', () => {
      expect(date.set('millisecond', 556)).toEqual(
        new Date('2023-01-03T12:30:30.556'),
      );
    });

    it('second', () => {
      expect(date.set('second', 45)).toEqual(
        new Date('2023-01-03T12:30:45.556'),
      );
    });

    it('minute', () => {
      expect(date.set('minute', 33)).toEqual(
        new Date('2023-01-03T12:33:45.556'),
      );
    });

    it('hour', () => {
      expect(date.set('hour', 15)).toEqual(new Date('2023-01-03T15:33:45.556'));
    });

    it('day', () => {
      expect(date.set('day', 8)).toEqual(new Date('2023-01-08T15:33:45.556'));
    });

    it('month', () => {
      expect(date.set('month', 2)).toEqual(new Date('2023-03-08T15:33:45.556'));
    });

    it('year', () => {
      expect(date.set('year', 2025)).toEqual(
        new Date('2025-03-08T15:33:45.556'),
      );
    });
  });

  describe('startOf', () => {
    const date = new Date('2023-01-03T12:30:30.500');

    it('second', () => {
      expect(date.clone().startOf('second').getTime()).toBe(
        new Date('2023-01-03T12:30:30.000').getTime(),
      );
    });

    it('minute', () => {
      expect(date.clone().startOf('minute').getTime()).toBe(
        new Date('2023-01-03T12:30:00.000').getTime(),
      );
    });

    it('hour', () => {
      expect(date.clone().startOf('hour').getTime()).toBe(
        new Date('2023-01-03T12:00:00.000').getTime(),
      );
    });

    it('day', () => {
      expect(date.clone().startOf('day').getTime()).toBe(
        new Date('2023-01-03T00:00:00.000').getTime(),
      );
    });

    it('week', () => {
      expect(date.clone().startOf('week').getTime()).toBe(
        new Date('2023-01-01T00:00:00.000').getTime(),
      );
    });

    it('month', () => {
      expect(date.clone().startOf('month').getTime()).toBe(
        new Date('2023-01-01T00:00:00.000').getTime(),
      );
    });

    it('year', () => {
      expect(date.clone().startOf('year').getTime()).toBe(
        new Date('2023-01-01T00:00:00.000').getTime(),
      );
    });
  });
});
