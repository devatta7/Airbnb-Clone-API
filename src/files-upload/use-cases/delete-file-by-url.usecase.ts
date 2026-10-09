import { Injectable } from '@nestjs/common';
import { S3FileStorageService } from '../storage/s3/s3-file-storage.service';

@Injectable()
export class DeleteFileByUrlUseCase {
  constructor(private readonly s3FileStorageService: S3FileStorageService) {}
}
