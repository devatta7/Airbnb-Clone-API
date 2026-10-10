import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UnitResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'Modern apartment in downtown' })
  title: string;

  @Expose()
  @ApiProperty({
    example: 'A comfortable apartment close to city attractions.',
  })
  description: string;

  @Expose()
  @ApiProperty({ example: '12 Nile Street, Cairo' })
  address: string;

  @Expose()
  @ApiProperty({ type: [String], example: ['https://example.com/photo.jpg'] })
  photos: string[];

  @Expose()
  @ApiProperty({ example: 1200 })
  costPerDay: number;

  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439012' })
  country: string;

  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439013' })
  city: string;

  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439014' })
  unitCategory: string;

  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439015' })
  user: string;

  @Expose()
  @ApiProperty({ example: 2 })
  roomsCount: number;

  @Expose()
  @ApiProperty({ example: 4 })
  adultsCount: number;

  @Expose()
  @ApiProperty({ example: 1 })
  kidsCount: number;

  @Expose()
  @ApiProperty({ example: false })
  hasInternetService: boolean;

  @Expose()
  @ApiProperty({ example: false })
  hasKitchen: boolean;

  @Expose()
  @ApiProperty({ example: false })
  hasPrivateGarage: boolean;

  @Expose()
  @ApiProperty({ example: true })
  availability: boolean;

  @Expose()
  @ApiProperty({ example: true })
  isActive: boolean;

  @Expose()
  @ApiProperty({ example: '2026-10-03T12:00:00.000Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2026-10-03T12:00:00.000Z' })
  updatedAt: Date;

  @Exclude()
  __v: number;

  @Exclude()
  isDeleted: boolean;

  @Exclude()
  deletedAt?: Date;
}
