import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModelNames } from '../common/data-access/model-names.enum';
import { UnitCategoriesController } from './unit-categories.controller';
import { UnitCategoriesService } from './unit-categories.service';
import { UnitCategoryRepository } from './repository/unit-category.repository';
import { UnitCategorySchema } from './schema/unit-category.schema';
import { CreateUnitCategoryUseCase } from './use-cases/create-unit-category.usecase';
import { FindAllUnitCategoriesUseCase } from './use-cases/find-all-unit-categories.usecase';
import { FindUnitCategoryByIdUseCase } from './use-cases/find-unit-category-by-id.usecase';
import { SoftDeleteUnitCategoryUseCase } from './use-cases/soft-delete-unit-category.usecase';
import { UpdateUnitCategoryUseCase } from './use-cases/update-unit-category.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.UNIT_CATEGORIES, schema: UnitCategorySchema },
    ]),
  ],
  controllers: [UnitCategoriesController],
  providers: [
    UnitCategoriesService,
    UnitCategoryRepository,
    CreateUnitCategoryUseCase,
    FindUnitCategoryByIdUseCase,
    FindAllUnitCategoriesUseCase,
    UpdateUnitCategoryUseCase,
    SoftDeleteUnitCategoryUseCase,
  ],
  exports: [UnitCategoryRepository],
})
export class UnitCategoriesModule {}
