import { Injectable } from '@nestjs/common';

@Injectable()
export class S3FileStorageService {
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
