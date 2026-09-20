import { Injectable, NotFoundException } from '@nestjs/common';

import { UnitCategoryRepository } from '../repository/unit-category.repository';

@Injectable()
export class SoftDeleteUnitCategoryUseCase {
  constructor(private readonly repository: UnitCategoryRepository) {}

  async execute(id: string): Promise<void> {
    const category = await this.repository.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
    );

    if (!category) {
      throw new NotFoundException('Unit category not found');
    }
  }
}
