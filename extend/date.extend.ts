import dayjs, { ManipulateType, OpUnitType, QUnitType } from 'dayjs';

function refresh(newValue: dayjs.Dayjs, original: Date) {
  original.setTime(newValue.toDate().getTime());

  return original;
}

/**
Atenção: Todos os métodos que causam alteração na data, a tratam como mutável
 */

declare global {
  interface Date {
    add(value: number, unit?: ManipulateType): this;

    clone(): Date;

    diff(date: Date, unit: QUnitType | OpUnitType, float?: boolean): number;

    endOf(unit: OpUnitType): this;

    format(template: string): string;

    formatOnlyDate(): string;

    formatOnlyTime(
      template?: 'HH:mm' | 'HH:mm:ss' | 'hh:mm' | 'hh:mm:ss',
    ): string;

    formatWithoutTimezone(): string;

    isAfter(date: Date | string, unit?: OpUnitType): boolean;

    isAfterOrEqual(date: Date | string, unit?: OpUnitType): boolean;

    isBefore(date: Date | string, unit?: OpUnitType): boolean;

    isBeforeOrEqual(date: Date | string, unit?: OpUnitType): boolean;

    isSame(date: Date | string, unit?: OpUnitType): boolean;

    startOf(unit: OpUnitType): this;
  }
}

Date.prototype.add = function (value: number, unit?: ManipulateType) {
  return refresh(dayjs(this).add(value, unit), this);
};

Date.prototype.clone = function () {
  return dayjs(this).toDate();
};

Date.prototype.diff = function (
  date: Date,
  unit: QUnitType | OpUnitType,
  float = false,
) {
  return dayjs(this).diff(date, unit, float);
};

Date.prototype.endOf = function (unit: OpUnitType) {
  return refresh(dayjs(this).endOf(unit), this);
};

Date.prototype.format = function (template: string) {
  return dayjs(this).format(template);
};

Date.prototype.formatOnlyDate = function () {
  return dayjs(this).format('YYYY-MM-DD');
};

Date.prototype.formatOnlyTime = function (
  template: 'HH:mm' | 'HH:mm:ss' | 'hh:mm' | 'hh:mm:ss' = 'HH:mm',
) {
  return dayjs(this).format(template);
};

Date.prototype.formatWithoutTimezone = function () {
  return dayjs(this).format('YYYY-MM-DD HH:mm:ss');
};

Date.prototype.isAfter = function (date: Date | string, unit?: OpUnitType) {
  return dayjs(this).isAfter(date, unit);
};

Date.prototype.isAfterOrEqual = function (
  date: Date | string,
  unit?: OpUnitType,
) {
  return dayjs(this).isAfter(date, unit) || this.isSame(date, unit);
};

Date.prototype.isBefore = function (date: Date | string, unit?: OpUnitType) {
  return dayjs(this).isBefore(date, unit);
};

Date.prototype.isBeforeOrEqual = function (
  date: Date | string,
  unit?: OpUnitType,
) {
  return dayjs(this).isBefore(date, unit) || this.isSame(date, unit);
};

Date.prototype.isSame = function (date: Date | string, unit?: OpUnitType) {
  return dayjs(this).isSame(date, unit);
};

Date.prototype.startOf = function (unit: OpUnitType) {
  return refresh(dayjs(this).startOf(unit), this);
};
