import { BadRequestException, Injectable } from '@nestjs/common';
import { AppSettingsService } from '../../app-settings/app-settings.service';
import { UnitCategoriesService } from '../../unit-categories/unit-categories.service';
import { CountriesService } from '../../countries/countries.service';
import { CitiesService } from '../../cities/cities.service';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import { UpdateUnitDto } from '../dtos/update-unit.dto';

@Injectable()
export class UnitValidationUseCase {
  constructor(
    private readonly appSettingsService: AppSettingsService,
    private readonly cityService: CitiesService,
    private readonly countryService: CountriesService,
    private readonly unitCategoryService: UnitCategoriesService,
  ) {}

  async execute(body: CreateUnitDto | UpdateUnitDto): Promise<void> {
    const appSettings = await this.appSettingsService.findOne();
    const minPrice = appSettings.minPrice;

    if (body.costPerDay !== undefined && body.costPerDay < minPrice) {
      throw new BadRequestException(
        `Cost per day must be greater than or equal to ${minPrice}`,
      );
    }

    if (body.city !== undefined) {
      await this.cityService.findOne(body.city);
    }

    if (body.country !== undefined) {
      await this.countryService.findOne(body.country);
    }

    if (body.unitCategory !== undefined) {
      await this.unitCategoryService.findOne(body.unitCategory);
    }
  }
}
