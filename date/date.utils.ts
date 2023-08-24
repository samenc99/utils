export class DateUtils {
  static intervalUnit(
    init: Date,
    end: Date,
    include: '()' | '[]' | '(]' | '[)' = '[]',
  ): {
    unit: 'year' | 'month' | 'week' | 'day';
    interval: number;
  } {
    init = init.clone();
    end = end.clone();

    if (include.includes('[')) {
      init.add(-1, 'day');
    }
    if (include.includes(')')) {
      end.add(-1, 'day');
    }

    const units: ['year', 'month', 'week', 'day'] = [
      'year',
      'month',
      'week',
      'day',
    ];

    for (const unit of units) {
      const diff = end.diff(init, unit);

      if (diff >= 1) {
        return {
          unit,
          interval: diff,
        };
      }
    }

    return {
      unit: 'day',
      interval: 1,
    };
  }

  static isInitEnd(
    init: Date,
    end: Date,
    unit: 'day' | 'week' | 'month' | 'year',
  ) {
    return (
      init.isSame(init.clone().startOf(unit)) &&
      end.isSame(init.clone().endOf(unit))
    );
  }
}
