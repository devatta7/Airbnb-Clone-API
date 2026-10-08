import { Injectable } from '@nestjs/common';
import { DeleteFileByUrlUseCase } from './use-cases/delete-file-by-url.usecase';
import { UploadMultipleFileUseCase } from './use-cases/upload-multiple-files.usecase';
import { UploadSingleFileUseCase } from './use-cases/upload-single-file.usecase';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
    private readonly uploadMultipleFileUseCase: UploadMultipleFileUseCase,
    private readonly deleteFileByUrlUseCase: DeleteFileByUrlUseCase,
  ) {}

  uploadSingleFile() {
    //return this.uploadSingleFileUseCase.execute(file);
  }

  uploadMultipleFiles() {
    //return this.uploadMultipleFileUseCase.execute(files);
  }

  deleteFileByUrl() {
    //return this.deleteFileByUrlUseCase.execute(fileUrl);
  }
}
