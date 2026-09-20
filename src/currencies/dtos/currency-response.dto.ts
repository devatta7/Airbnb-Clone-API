import { Exclude, Expose } from 'class-transformer';

export class CurrencyResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  currencyCode: string;

  @Exclude()
  __v: number;

  @Exclude()
  isDeleted: boolean;
}
