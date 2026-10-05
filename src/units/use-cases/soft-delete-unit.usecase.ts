import { Injectable, NotFoundException } from '@nestjs/common';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { UnitRepository } from '../repository/unit.repository';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { FindOneUseCase } from './find-one.usecase';

@Injectable()
export class SoftDeleteUnitUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly findOneUseCase: FindOneUseCase,
  ) {}

  async execute(id: string, currentUser: CurrentUserData): Promise<void> {
    const unit = await this.findOneUseCase.execute({
      _id: id,
      isDeleted: { $ne: true },
    });

    this.checkUnitAuthUseCase.execute(String(unit.user), currentUser._id);

    // TODO : If there are no booking in not complete status related to that unit, allow deleting the unit.
    const deletedUnit = await this.unitRepository.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      { isDeleted: true, deletedAt: new Date() },
      { runValidators: true },
    );

    if (!deletedUnit) {
      throw new NotFoundException('Unit not found');
    }
  }
}
