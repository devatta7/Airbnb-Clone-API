import { ApiProperty } from '@nestjs/swagger';

export class BookingCalculationResponse {
  @ApiProperty({ description: 'Unit price per day', example: 1200 })
  pricePerDay: number;

  @ApiProperty({ description: 'Number of booked days', example: 4 })
  daysCount: number;

  @ApiProperty({ description: 'Booking amount before VAT', example: 4800 })
  bookingAmount: number;

  @ApiProperty({ description: 'VAT rate percentage', example: 14 })
  vat: number;

  @ApiProperty({ description: 'VAT amount', example: 672 })
  vatAmount: number;

  @ApiProperty({ description: 'Total amount including VAT', example: 5472 })
  totalAmount: number;
}
