import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BookingUnitSummaryDto {
  @ApiProperty({ example: '60d21b4967d0d8992e610c85' })
  @Expose()
  _id: string;

  @ApiProperty({ example: 'Central apartment' })
  @Expose()
  title: string;
}

export class BookingUserSummaryDto {
  @ApiProperty({ example: '60d21b4967d0d8992e610c85' })
  @Expose()
  _id: string;

  @ApiProperty({ example: 'Alex Smith' })
  @Expose()
  name: string;

  @ApiPropertyOptional({ example: '+201000000000' })
  @Expose()
  phoneNumber?: string;
}
