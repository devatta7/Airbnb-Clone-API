import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { ModelNames } from '../common/data-access/model-names.enum';
import { UnitRepository } from './repository/unit.repository';
import { UnitSchema } from './schema/unit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelNames.UNITS, schema: UnitSchema }]),
  ],
  providers: [UnitsService, UnitRepository],
  controllers: [UnitsController],
  exports: [UnitRepository],
})
export class UnitsModule {}
