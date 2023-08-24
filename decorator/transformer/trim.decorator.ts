import { Transform } from 'class-transformer';

export default function Trim() {
  return Transform(({ value }) => value?.trim());
}
