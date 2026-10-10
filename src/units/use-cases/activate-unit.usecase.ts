import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { UnitRepository } from '../repository/unit.repository';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { FindOneUseCase } from './find-one.usecase';

@Injectable()
export class ActivateUnitUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly findOneUseCase: FindOneUseCase,
  ) {}

  async execute(
    id: string,
    currentUser: CurrentUserData,
  ): Promise<UnitResponseDto> {
    const unit = await this.findOneUseCase.execute({
      _id: id,
      isDeleted: { $ne: true },
    });
    this.checkUnitAuthUseCase.execute(unit.user, currentUser._id);

    const updatedUnit = await this.unitRepository.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      { isActive: true },
      { runValidators: true },
    );
    if (!updatedUnit) throw new NotFoundException('Unit not found');

    return plainToInstance(UnitResponseDto, updatedUnit.toObject());
  }
}
