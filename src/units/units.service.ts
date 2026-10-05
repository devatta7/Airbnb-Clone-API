import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { CurrentUserData } from '../auth/interfaces/principal.interface';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';
import { UpdateUnitUseCase } from './use-cases/update-unit-usecase';
import { UpdateUnitDto } from './dtos/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly updateUnitUseCase: UpdateUnitUseCase,
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
}
