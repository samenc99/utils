import { extend } from '../../extend/date';
import { DateUtils } from './date.util';
import { beforeEach, expect } from '@jest/globals';

extend();

function intervalUnit(
  [init, end, include]: Parameters<typeof DateUtils.intervalUnit>,
  unit: ReturnType<typeof DateUtils.intervalUnit>['unit'],
  interval: ReturnType<typeof DateUtils.intervalUnit>['interval'],
) {
  expect(DateUtils.intervalUnit(init, end, include)).toEqual({
    unit,
    interval,
  });
}

function isInitEnd(
  [init, end, unit]: Parameters<typeof DateUtils.isInitEnd>,
  expected: ReturnType<typeof DateUtils.isInitEnd>,
) {
  expect(DateUtils.isInitEnd(init, end, unit)).toBe(expected);
}

describe('DateUtils', () => {
  describe('intervalUnit', () => {
    describe('immutable', () => {
      it('', () => {
        const init = new Date();
        const end = new Date();

        DateUtils.intervalUnit(init, end, '[]');
        DateUtils.intervalUnit(init, end, '()');
        DateUtils.intervalUnit(init, end, '(]');
        DateUtils.intervalUnit(init, end, '[)');

        expect(init).toEqual(init);
        expect(end).toEqual(end);
      });
    });

    describe('day', () => {
      const init = new Date('2022-01-01');
      const end = new Date('2022-01-02');

      it('(]', () => intervalUnit([init, end, '(]'], 'day', 1));

      it('[)', () => intervalUnit([init, end, '[)'], 'day', 1));

      it('()', () => intervalUnit([init, end, '()'], null, 0));

      it('[]', () => intervalUnit([init, end, '[]'], 'day', 2));

      it('(]', () =>
        intervalUnit([init, new Date('2022-01-07'), '(]'], 'day', 6));

      it('()', () =>
        intervalUnit([init, new Date('2022-01-08'), '()'], 'day', 6));
    });

    describe('week', () => {
      const init = new Date('2022-01-01');
      const end = new Date('2022-01-07');

      it('[]', () => intervalUnit([init, end, '[]'], 'week', 1));

      it('[)', () =>
        intervalUnit([init, new Date('2022-01-08'), '[)'], 'week', 1));

      it('()', () =>
        intervalUnit([init, new Date('2022-01-09'), '()'], 'week', 1));

      it('(]', () =>
        intervalUnit([init, new Date('2022-01-08'), '(]'], 'week', 1));

      it('(]', () =>
        intervalUnit([init, new Date('2022-01-31'), '(]'], 'week', 4));

      it('()', () =>
        intervalUnit([init, new Date('2022-02-01'), '()'], 'week', 4));
    });

    describe('month', () => {
      const init = new Date('2022-01-01');

      it('[]', () =>
        intervalUnit([init, new Date('2022-01-31'), '[]'], 'month', 1));

      it('[)', () =>
        intervalUnit([init, new Date('2022-02-01'), '[)'], 'month', 1));

      it('()', () =>
        intervalUnit([init, new Date('2022-02-03'), '()'], 'month', 1));

      it('(]', () =>
        intervalUnit([init, new Date('2022-02-01'), '(]'], 'month', 1));

      it('(]', () =>
        intervalUnit([init, new Date('2022-12-31'), '(]'], 'month', 11));

      it('()', () =>
        intervalUnit([init, new Date('2023-01-01'), '()'], 'month', 11));
    });

    describe('year', () => {
      const init = new Date('2022-01-01');

      it('[]', () =>
        intervalUnit([init, new Date('2022-12-31'), '[]'], 'year', 1));

      it('[)', () =>
        intervalUnit([init, new Date('2023-01-01'), '[)'], 'year', 1));

      it('()', () =>
        intervalUnit([init, new Date('2023-01-02'), '()'], 'year', 1));

      it('(]', () =>
        intervalUnit([init, new Date('2023-01-01'), '(]'], 'year', 1));
    });
  });

  describe('isInitEnd', () => {
    let init: Date, end: Date;

    describe('second', () => {
      beforeEach(() => {
        init = new Date('2022-01-03T12:23:05.793');
        end = new Date('2022-01-03T12:23:05.793');
      });

      it('false', () => isInitEnd([init, end, 'second'], false));

      it('false', () =>
        isInitEnd(
          [end.endOf('second'), init.startOf('second'), 'second'],
          false,
        ));

      it('false', () =>
        isInitEnd(
          [end.endOf('minute'), init.startOf('minute'), 'second'],
          false,
        ));

      it('true', () =>
        isInitEnd(
          [init.startOf('second'), end.endOf('second'), 'second'],
          true,
        ));
    });

    describe('minute', () => {
      beforeEach(() => {
        init = new Date('2022-01-03T12:23:05.000');
        end = new Date('2022-01-03T12:23:05.999');
      });

      it('false', () => isInitEnd([init, end, 'minute'], false));

      it('false', () =>
        isInitEnd(
          [end.endOf('minute'), init.startOf('minute'), 'minute'],
          false,
        ));

      it('false', () =>
        isInitEnd([end.endOf('hour'), init.startOf('hour'), 'minute'], false));

      it('true', () =>
        isInitEnd(
          [init.startOf('minute'), end.endOf('minute'), 'minute'],
          true,
        ));
    });

    describe('hour', () => {
      beforeEach(() => {
        init = new Date('2022-01-03T12:23:01.000');
        end = new Date('2022-01-03T12:23:59.999');
      });

      it('false', () => isInitEnd([init, end, 'hour'], false));

      it('false', () =>
        isInitEnd([end.endOf('hour'), init.startOf('hour'), 'hour'], false));

      it('false', () =>
        isInitEnd([end.endOf('hour'), init.startOf('hour'), 'minute'], false));

      it('true', () =>
        isInitEnd([init.startOf('hour'), end.endOf('hour'), 'hour'], true));
    });

    describe('day', () => {
      beforeEach(() => {
        init = new Date('2022-01-03T12:01:01.000');
        end = new Date('2022-01-03T12:59:59.999');
      });

      it('false', () => isInitEnd([init, end, 'day'], false));

      it('false', () =>
        isInitEnd([end.endOf('day'), init.startOf('day'), 'day'], false));

      it('false', () =>
        isInitEnd([end.endOf('day'), init.startOf('day'), 'hour'], false));

      it('true', () =>
        isInitEnd([init.startOf('day'), end.endOf('day'), 'day'], true));
    });

    describe('week', () => {
      beforeEach(() => {
        init = new Date('2022-01-03T00:01:01.000');
        end = new Date('2022-01-03T23:59:59.999');
      });

      it('false', () => isInitEnd([init, end, 'week'], false));

      it('false', () =>
        isInitEnd([end.endOf('week'), init.startOf('week'), 'week'], false));

      it('false', () =>
        isInitEnd([end.endOf('week'), init.startOf('week'), 'day'], false));

      it('true', () =>
        isInitEnd([init.startOf('week'), end.endOf('week'), 'week'], true));
    });

    describe('month', () => {
      beforeEach(() => {
        init = new Date('2022-01-01T00:01:01.000');
        end = new Date('2022-01-07T23:59:59.999');
      });

      it('false', () => isInitEnd([init, end, 'month'], false));

      it('false', () =>
        isInitEnd([end.endOf('month'), init.startOf('month'), 'month'], false));

      it('false', () =>
        isInitEnd([end.endOf('month'), init.startOf('month'), 'week'], false));

      it('true', () =>
        isInitEnd([init.startOf('month'), end.endOf('month'), 'month'], true));
    });

    describe('year', () => {
      beforeEach(() => {
        init = new Date('2022-01-01T00:01:01.000');
        end = new Date('2022-01-31T23:59:59.999');
      });

      it('false', () => isInitEnd([init, end, 'year'], false));

      it('false', () =>
        isInitEnd([end.endOf('year'), init.startOf('year'), 'year'], false));

      it('false', () =>
        isInitEnd([end.endOf('year'), init.startOf('year'), 'month'], false));

      it('true', () =>
        isInitEnd([init.startOf('year'), end.endOf('year'), 'year'], true));
    });
  });
});
