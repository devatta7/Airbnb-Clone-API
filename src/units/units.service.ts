import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { CurrentUserData } from '../auth/interfaces/principal.interface';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';
import { UpdateUnitUseCase } from './use-cases/update-unit-usecase';
import { UpdateUnitDto } from './dtos/update-unit.dto';
import { FindOneUseCase } from './use-cases/find-one.usecase';
import { FindAllUnitsUseCase } from './use-cases/find-all-units.usecase';
import { FindAllUnitsDto } from './dtos/find-all-units.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { SoftDeleteUnitUseCase } from './use-cases/soft-delete-unit.usecase';
import { ActivateUnitUseCase } from './use-cases/activate-unit.usecase';
import { DeactivateUnitUseCase } from './use-cases/deactivate-unit.usecase';

@Injectable()
export class UnitsService {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly updateUnitUseCase: UpdateUnitUseCase,
    private readonly findOneUseCase: FindOneUseCase,
    private readonly findAllUnitsUseCase: FindAllUnitsUseCase,
    private readonly softDeleteUnitUseCase: SoftDeleteUnitUseCase,
    private readonly activateUnitUseCase: ActivateUnitUseCase,
    private readonly deactivateUnitUseCase: DeactivateUnitUseCase,
  ) {}

  create(
    body: CreateUnitDto,
    currentUser: CurrentUserData,
  ): Promise<UnitResponseDto> {
    return this.createUnitUseCase.execute(body, currentUser);
  }

  update(
    id: string,
    body: UpdateUnitDto,
    currentUser: CurrentUserData,
  ): Promise<UnitResponseDto> {
    return this.updateUnitUseCase.execute(id, body, currentUser);
  }

  delete(id: string, currentUser: CurrentUserData): Promise<void> {
    return this.softDeleteUnitUseCase.execute(id, currentUser);
  }

  activate(id: string, currentUser: CurrentUserData): Promise<UnitResponseDto> {
    return this.activateUnitUseCase.execute(id, currentUser);
  }

  deactivate(
    id: string,
    currentUser: CurrentUserData,
  ): Promise<UnitResponseDto> {
    return this.deactivateUnitUseCase.execute(id, currentUser);
  }

  findOne(id: string): Promise<UnitResponseDto> {
    return this.findOneUseCase.execute({ _id: id, isDeleted: { $ne: true } });
  }

  findAll(query: FindAllUnitsDto): Promise<PaginatedResult<UnitResponseDto>> {
    return this.findAllUnitsUseCase.execute(query);
  }

  findCurrentUserUnits(
    query: FindAllUnitsDto,
    currentUser: CurrentUserData,
  ): Promise<PaginatedResult<UnitResponseDto>> {
    return this.findAllUnitsUseCase.execute(query, currentUser._id);
  }
}
