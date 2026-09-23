import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'Egypt' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'EG' })
  countryCode: string;

  @Exclude()
  __v: number;

  @Exclude()
  IsDeleted: boolean;
}
