import { TUnit } from '../../extend/date/date.extend';

type TIntervalUnit = Extract<TUnit, 'year' | 'month' | 'week' | 'day'>;

export class DateUtils {
  /**
   * Método para descobrir qual a maior unidade que separa duas datas (sendo a menor delas 1 dia).
   *
   * A hora não é levado em consideração
   *
   * @param init
   * @param end
   * @param include Incluir ou não o dia da data -> default: (]
   */
  static intervalUnit(
    init: Date,
    end: Date,
    include: '()' | '[]' | '(]' | '[)' = '(]',
  ): {
    unit: TIntervalUnit | null;
    interval: number;
  } {
    let factor = 1;

    if (init.isBefore(end)) {
      init = init.clone();
      end = end.clone();
    } else {
      init = end.clone();
      end = init.clone();
      factor = -1;
    }

    if (include.includes('[')) {
      init.add(-1, 'day');
    }
    if (include.includes(')')) {
      end.add(-1, 'day');
    }

    const units: TIntervalUnit[] = ['year', 'month', 'week', 'day'];

    for (const unit of units) {
      const diff = end.diff(init, unit);

      if (diff >= 1) {
        return {
          unit,
          interval: diff * factor,
        };
      }
    }

    return {
      unit: null,
      interval: 0,
    };
  }

  /**
   * Método para descobrir se é data de início e fim de alguma unidade
   */
  static isInitEnd(
    init: Date,
    end: Date,
    unit: Exclude<TUnit, 'millisecond' | 'milliseconds'>,
  ) {
    return (
      init.isSame(init.clone().startOf(unit)) &&
      end.isSame(init.clone().endOf(unit))
    );
  }
}
