import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Cairo' })
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  country: string;
}
