import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAccount } from '../auth/decorators/current-account.decorators';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as UserRole } from '../auth/roles/roles.constant';
import type { IPrincipal } from '../auth/interfaces/principal.interface';
import { ApiTag } from '../common/swagger/constant';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto';
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

  @Patch(':id')
  @Roles(UserRole.USER)
  @ApiOkResponse({ type: UnitResponseDto })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateUnitDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<UnitResponseDto> {
    return this.unitsService.update(id, body, account.user);
  }
}
