import { Exclude, Expose } from 'class-transformer';

export class UnitCategoryResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Exclude()
  __v: number;

  @Exclude()
  icon?: string;

  @Exclude()
  isDeleted: boolean;
}
