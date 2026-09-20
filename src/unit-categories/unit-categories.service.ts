import { Injectable } from '@nestjs/common';

import { PaginatedResult } from '../common/data-access/base-repository';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { FindAllUnitCategoriesDto } from './dtos/find-all-unit-categories.dto';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { CreateUnitCategoryUseCase } from './use-cases/create-unit-category.usecase';
import { FindAllUnitCategoriesUseCase } from './use-cases/find-all-unit-categories.usecase';
import { FindUnitCategoryByIdUseCase } from './use-cases/find-unit-category-by-id.usecase';
import { SoftDeleteUnitCategoryUseCase } from './use-cases/soft-delete-unit-category.usecase';
import { UpdateUnitCategoryUseCase } from './use-cases/update-unit-category.usecase';

@Injectable()
export class UnitCategoriesService {
  constructor(
    private readonly createUseCase: CreateUnitCategoryUseCase,
    private readonly findByIdUseCase: FindUnitCategoryByIdUseCase,
    private readonly findAllUseCase: FindAllUnitCategoriesUseCase,
    private readonly updateUseCase: UpdateUnitCategoryUseCase,
    private readonly softDeleteUseCase: SoftDeleteUnitCategoryUseCase,
  ) {}

  create(body: CreateUnitCategoryDto): Promise<UnitCategoryResponseDto> {
    return this.createUseCase.execute(body);
  }

  findOne(id: string): Promise<UnitCategoryResponseDto> {
    return this.findByIdUseCase.execute(id);
  }

  findAll(
    query: FindAllUnitCategoriesDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.findAllUseCase.execute(query);
  }

  update(
    id: string,
    body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.updateUseCase.execute(id, body);
  }

  softDelete(id: string): Promise<void> {
    return this.softDeleteUseCase.execute(id);
  }
}
