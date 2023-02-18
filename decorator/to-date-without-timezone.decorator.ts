import { Transform } from 'class-transformer';
import { DateManipulationUtils } from '../utils/date-manipulation.utils';

export default function ToDateWithoutTimezone() {
  return Transform(({ value }) =>
    DateManipulationUtils.toDateWithoutTimezone(value),
  );
}
