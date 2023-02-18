import dayjs from 'dayjs';

export class DateManipulationUtils {
  static toStartDay(date: string | Date) {
    return dayjs(date, 'YYYY-MM-DD').startOf('day').toDate();
  }

  static toEndDay(date: string | Date) {
    return dayjs(date, 'YYYY-MM-DD').endOf('day').toDate();
  }

  static toStringDate(date: Date) {
    return dayjs(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
  }
}
