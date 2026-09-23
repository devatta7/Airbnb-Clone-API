import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Apartment' })
  name: string;
}
