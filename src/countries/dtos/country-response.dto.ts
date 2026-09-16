import { Exclude, Expose, Transform } from 'class-transformer';

export class CountryResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @Expose()
  name: string;

  @Expose()
  countryCode: string;

  @Exclude()
  __v: number;

  @Exclude()
  IsDeleted: boolean;
}
