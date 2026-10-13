import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsMongoId, IsOptional } from 'class-validator';

import { PaginationDto } from '../../common/data-access/dto/pagination.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { BookingUserType } from '../enums/booking-user-type.enum';

export class FindAllBookingsDto extends PaginationDto {
  @IsOptional()
  @IsEnum(BookingUserType)
  userType?: BookingUserType;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsMongoId()
  unit?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkIn?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkOut?: Date;
}
