import {
  Exclude,
  Expose,
  Transform,
  type TransformFnParams,
} from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @Expose()
  @Transform(({ obj }: TransformFnParams) =>
    (obj as { _id: { toString(): string } })._id.toString(),
  )
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
  isDeleted: boolean;
}
