import { ApiProperty } from '@nestjs/swagger';

export class AppSettingsResponseDto {
  @ApiProperty({ example: 14 })
  vatRate: number;

  @ApiProperty({ example: 100 })
  minPrice: number;
}
