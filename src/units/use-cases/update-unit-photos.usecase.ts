import { Injectable, NotFoundException } from '@nestjs/common';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { FilesUploadService } from '../../files-upload/files-upload.service';
import { FindOneUseCase } from './find-one.usecase';
import { UnitRepository } from '../repository/unit.repository';
import { MulterFile } from '../../files-upload/storage/types/multer-file.type';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateUnitPhotosUseCase {
  constructor(
    private readonly filesUploadService: FilesUploadService,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly findOneUseCase: FindOneUseCase,
    private readonly unitRepository: UnitRepository,
  ) {}

  async execute(
    id: string,
    user: CurrentUserData,
    photos: MulterFile[],
  ): Promise<UnitResponseDto> {
    const unit = await this.findOneUseCase.execute({
      _id: id,
      isDeleted: { $ne: true },
    });
    this.checkUnitAuthUseCase.execute(unit.user, user._id);

    const uploadedPhotos =
      await this.filesUploadService.uploadMultipleFiles(photos);

    const updatedUnitPhotos = await this.unitRepository.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      {
        $addToSet: {
          photos: { $each: uploadedPhotos },
        },
      },
      { new: true },
    );

    if (!updatedUnitPhotos) {
      await this.filesUploadService.deleteFiles(uploadedPhotos);
      throw new NotFoundException('Unit not found');
    }

    return plainToInstance(UnitResponseDto, updatedUnitPhotos.toObject());
  }
}
