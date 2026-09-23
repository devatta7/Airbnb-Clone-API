import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UnitCategoryResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'Apartment' })
  name: string;

  @Exclude()
  __v: number;

  @Exclude()
  icon?: string;

  @Exclude()
  isDeleted: boolean;
}
