import { Controller, Get, Param, Query } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTag } from '../common/swagger/constant';
import { PaginatedResult } from '../common/data-access/base-repository';
import { FindUnitReviewResponseDto } from './dtos/find-unit-review-response.dto';
import { FindUnitReviewsDto } from './dtos/find-unit-reviews.dto';
import { UnitReviewsService } from './unit-reviews.service';
import { SwaggerFindUnitReviews } from './swagger/api-unit-reviews.swagger';

@ApiTags(ApiTag.UNIT_REVIEWS)
@Controller('units/:unitId/reviews')
export class UnitReviewsController {
  constructor(private readonly unitReviewsService: UnitReviewsService) {}

  @Get()
  @Public()
  @SwaggerFindUnitReviews()
  findForUnit(
    @Param('unitId', ParseObjectIdPipe) unitId: string,
    @Query() query: FindUnitReviewsDto,
  ): Promise<PaginatedResult<FindUnitReviewResponseDto>> {
    return this.unitReviewsService.findUnitReviews({ ...query, unit: unitId });
  }
}
