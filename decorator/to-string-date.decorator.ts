import { Transform } from 'class-transformer';
import { DateManipulationUtils } from '../utils/date-manipulation.utils';

export default function ToStringDate() {
  return Transform(({ value }) => DateManipulationUtils.toStringDate(value));
}
