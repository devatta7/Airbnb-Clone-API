import { Injectable } from '@nestjs/common';
import { S3FileStorageService } from '../storage/s3/s3-file-storage.service';
import { MulterFile } from '../storage/types/multer-file.type';

@Injectable()
export class UploadSingleFileUseCase {
  constructor(private readonly s3FileStorageService: S3FileStorageService) {}
  async execute(file: MulterFile): Promise<string> {
    return this.s3FileStorageService.uploadFile(file);
  }
}
