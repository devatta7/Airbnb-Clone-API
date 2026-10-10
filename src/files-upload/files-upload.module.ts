import { Module } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { UploadSingleFileUseCase } from './use-cases/upload-single-file.usecase';
import { UploadMultipleFileUseCase } from './use-cases/upload-multiple-files.usecase';
import { DeleteFileByUrlUseCase } from './use-cases/delete-file-by-url.usecase';
import { S3FileStorageService } from './storage/s3/s3-file-storage.service';

@Module({
  providers: [
    FilesUploadService,
    UploadSingleFileUseCase,
    UploadMultipleFileUseCase,
    DeleteFileByUrlUseCase,
    S3FileStorageService,
  ],
  exports: [FilesUploadService],
})
export class FilesUploadModule {}
