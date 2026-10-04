import { BadRequestException, Injectable } from '@nestjs/common';
import { AppSettingsService } from '../../app-settings/app-settings.service';
import { UnitCategoriesService } from '../../unit-categories/unit-categories.service';
import { CountriesService } from '../../countries/countries.service';
import { CitiesService } from '../../cities/cities.service';
import { CreateUnitDto } from '../dtos/create-unit.dto';

@Injectable()
export class UnitValidationUseCase {
  constructor(
    private readonly appSettingsService: AppSettingsService,
    private readonly cityService: CitiesService,
    private readonly countryService: CountriesService,
    private readonly unitCategoryService: UnitCategoriesService,
  ) {}

  async execute(body: CreateUnitDto): Promise<void> {
    const appSettings = await this.appSettingsService.findOne();
    const minPrice = appSettings.minPrice;

    if (body.costPerDay < minPrice) {
      throw new BadRequestException(
        `Cost per day must be greater than or equal to ${minPrice}`,
      );
    }

    await this.cityService.findOne(body.city);
    await this.countryService.findOne(body.country);
    await this.unitCategoryService.findOne(body.unitCategory);
  }
}
