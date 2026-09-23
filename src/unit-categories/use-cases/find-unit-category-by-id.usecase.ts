import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { UnitCategoryRepository } from '../repository/unit-category.repository';

@Injectable()
export class FindUnitCategoryByIdUseCase {
  constructor(private readonly repository: UnitCategoryRepository) {}

  async execute(id: string): Promise<UnitCategoryResponseDto> {
    const category = await this.repository.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!category) {
      throw new NotFoundException('Unit category not found');
    }

    return plainToInstance(UnitCategoryResponseDto, category.toObject());
  }
}
