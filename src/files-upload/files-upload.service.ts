import { Injectable } from '@nestjs/common';
import { DeleteFileByUrlUseCase } from './use-cases/delete-file-by-url.usecase';
import { UploadMultipleFileUseCase } from './use-cases/upload-multiple-files.usecase';
import { UploadSingleFileUseCase } from './use-cases/upload-single-file.usecase';
import { MulterFile } from './storage/types/multer-file.type';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
    private readonly uploadMultipleFileUseCase: UploadMultipleFileUseCase,
    private readonly deleteFileByUrlUseCase: DeleteFileByUrlUseCase,
  ) {}

  uploadSingleFile(file: MulterFile): Promise<string> {
    return this.uploadSingleFileUseCase.execute(file);
  }

  uploadMultipleFiles(files: MulterFile[]): Promise<string[]> {
    return this.uploadMultipleFileUseCase.execute(files);
  }
  deleteFiles(url: string | string[]): Promise<void> {
    return this.deleteFileByUrlUseCase.execute(url);
  }
}
