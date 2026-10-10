import { Injectable } from '@nestjs/common';
import { MulterFile } from '../storage/types/multer-file.type';
import { UploadSingleFileUseCase } from './upload-single-file.usecase';

@Injectable()
export class UploadMultipleFileUseCase {
  constructor(
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
  ) {}

  async execute(files: MulterFile[]): Promise<string[]> {
    const uploadFiles = files.map((file) =>
      this.uploadSingleFileUseCase.execute(file),
    );

    return Promise.all(uploadFiles);
  }
}
