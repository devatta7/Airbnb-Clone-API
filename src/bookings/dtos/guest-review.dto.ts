import { ApiProperty } from '@nestjs/swagger';

export class GuestReviewDto {
  @ApiProperty({
    description: 'Review rating',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  rating: number;

  @ApiProperty({ description: 'Review comment', example: 'Great stay!' })
  comment: string;
}
