import { Exclude } from 'class-transformer';

export class CityResponseDto {
  name: string;
  _id: string;
  country: string;

  @Exclude()
  isDeleted: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
