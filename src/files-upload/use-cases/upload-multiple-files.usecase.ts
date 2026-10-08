import { Injectable } from '@nestjs/common';
import { S3FileStorageService } from '../storage/s3/s3-file-storage.service';

@Injectable()
export class UploadMultipleFileUseCase {
  constructor(private readonly s3FileStorageService: S3FileStorageService) {}
  execute() {
    return this.s3FileStorageService.uploadMultipleFiles();
  }
}
