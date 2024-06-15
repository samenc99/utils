import dayjs from 'dayjs';

export type TUnitLong =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';

export type TUnitLongPlural =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years';

export type TUnit = TUnitLong | TUnitLongPlural;

export type TUnitDate = 'date' | 'dates';

const transformedUnits: Record<TUnit, string> = {
  millisecond: 'millisecond',
  second: 'second',
  minute: 'minute',
  hour: 'hour',
  week: 'week',
  month: 'month',
  year: 'year',
  milliseconds: 'milliseconds',
  seconds: 'seconds',
  minutes: 'minutes',
  hours: 'hours',
  weeks: 'weeks',
  months: 'months',
  years: 'years',
  day: 'day',
  days: 'days',
};

const transformedUnitsDate: Record<TUnit | TUnitDate, string> = {
  ...transformedUnits,
  day: 'date',
  days: 'dates',
  date: 'date',
  dates: 'dates',
};

function refresh(newValue: dayjs.Dayjs, original: Date) {
  original.setTime(newValue.toDate().getTime());

  return original;
}

/**
 *********************************** Atenção **********************************
 * Todos os métodos que causam alteração na data, a tratam como mutável.
 * 'day' é tratado sempre como dia do mês
 */

declare global {
  interface Date {
    add(value: number, unit?: TUnit): this;

    between(init: Date, end: Date, unit?: TUnit): boolean;

    clone(): Date;

    diff(date: Date, unit: TUnit, float?: boolean): number;

    endOf(unit: Exclude<TUnit, 'millisecond' | 'milliseconds'>): this;

    format(template: string): string;

    formatOnlyDate(): string;

    formatOnlyTime(
      template?:
        | 'HH:mm'
        | 'HH:mm:ss'
        | 'HH:mm:ss.SSS'
        | 'hh:mm'
        | 'hh:mm:ss'
        | 'hh:mm:ss.SSS',
    ): string;

    formatWithoutTimezone(): string;

    isAfter(date: Date | string, unit?: TUnit): boolean;

    isAfterOrEqual(date: Date | string, unit?: TUnit): boolean;

    isBefore(date: Date | string, unit?: TUnit): boolean;

    isBeforeOrEqual(date: Date | string, unit?: TUnit): boolean;

    isSame(date: Date | string, unit?: TUnit): boolean;

    set(unit: Exclude<TUnit, 'week' | 'weeks'>, value: number): this;

    startOf(unit: Exclude<TUnit, 'millisecond' | 'milliseconds'>): this;
  }
}

Date.prototype.add = function (value: number, unit) {
  return refresh(
    dayjs(this).add(value, transformedUnits[unit as string]),
    this,
  );
};

Date.prototype.between = function (init: Date, end: Date, unit?: TUnit) {
  return this.isBeforeOrEqual(end, unit) && this.isAfterOrEqual(init, unit);
};

Date.prototype.clone = function () {
  return dayjs(this).toDate();
};

Date.prototype.diff = function (date, unit, float = false) {
  return dayjs(this).diff(date, transformedUnits[unit as string], float);
};

Date.prototype.endOf = function (unit) {
  return refresh(dayjs(this).endOf(transformedUnits[unit as string]), this);
};

Date.prototype.format = function (template: string) {
  return dayjs(this).format(template);
};

Date.prototype.formatOnlyDate = function () {
  return dayjs(this).format('YYYY-MM-DD');
};

Date.prototype.formatOnlyTime = function (template = 'HH:mm') {
  return dayjs(this).format(template);
};

Date.prototype.formatWithoutTimezone = function () {
  return dayjs(this).format('YYYY-MM-DD HH:mm:ss');
};

Date.prototype.isAfter = function (date, unit) {
  return dayjs(this).isAfter(date, transformedUnits[unit as string]);
};

Date.prototype.isAfterOrEqual = function (date: Date | string, unit) {
  return (
    dayjs(this).isAfter(date, transformedUnits[unit as string]) ||
    this.isSame(date, unit)
  );
};

Date.prototype.isBefore = function (date, unit) {
  return dayjs(this).isBefore(date, transformedUnits[unit as string]);
};

Date.prototype.isBeforeOrEqual = function (date, unit) {
  return (
    dayjs(this).isBefore(date, transformedUnits[unit as string]) ||
    this.isSame(date, unit)
  );
};

Date.prototype.isSame = function (date, unit) {
  return dayjs(this).isSame(date, transformedUnits[unit as string]);
};

Date.prototype.set = function (unit, value) {
  return refresh(
    dayjs(this).set(transformedUnitsDate[unit as string], value),
    this,
  );
};

Date.prototype.startOf = function (unit) {
  return refresh(dayjs(this).startOf(transformedUnits[unit as string]), this);
};
