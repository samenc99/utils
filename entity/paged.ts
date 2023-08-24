import { Expose } from 'class-transformer';

export class Paged<Entity> {
  @Expose()
  offset: number;

  @Expose()
  limit: number;

  @Expose()
  total: number;

  @Expose()
  hasNext: boolean;

  @Expose()
  content: Entity[];
}
