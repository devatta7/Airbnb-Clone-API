import { BadRequestException, Injectable } from '@nestjs/common';
import { FilesUploadService } from '../../files-upload/files-upload.service';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { DeleteUnitPhotosDto } from '../dtos/delete-unit-photos.dto';
import { FindOneUseCase } from './find-one.usecase';
import { UnitRepository } from '../repository/unit.repository';

@Injectable()
export class DeleteUnitPhotosUseCase {
  constructor(
    private readonly filesUploadService: FilesUploadService,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly findOneUseCase: FindOneUseCase,
    private readonly unitRepository: UnitRepository,
  ) {}

  async execute(
    unitId: string,
    body: DeleteUnitPhotosDto,
    currentUser: CurrentUserData,
  ): Promise<void> {
    const unit = await this.findOneUseCase.execute({
      _id: unitId,
      isDeleted: { $ne: true },
    });

    this.checkUnitAuthUseCase.execute(unit.user, currentUser._id);

    const unitPhotos = new Set(unit.photos);
    const photosToDelete = [...new Set(body.photos)];
    if (photosToDelete.some((photo) => !unitPhotos.has(photo))) {
      throw new BadRequestException(
        'One or more photos do not belong to this unit',
      );
    }

    await this.unitRepository.findByIdAndUpdate(unitId, {
      $pull: { photos: { $in: photosToDelete } },
    });

    await this.filesUploadService.deleteFiles(photosToDelete);
  }
}
