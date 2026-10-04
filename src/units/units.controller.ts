import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAccount } from '../auth/decorators/current-account.decorators';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as UserRole } from '../auth/roles/roles.constant';
import type { IPrincipal } from '../auth/interfaces/principal.interface';
import { ApiTag } from '../common/swagger/constant';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { UnitsService } from './units.service';

@ApiTags(ApiTag.UNITS)
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiCreatedResponse({ type: UnitResponseDto })
  create(
    @Body() body: CreateUnitDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<UnitResponseDto> {
    return this.unitsService.create(body, account.user);
  }
}
