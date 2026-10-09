import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EnvironmentInterface,
  IS3Configuration,
} from '../../../common/configuration/environment.interface';
import { extname } from 'path';
import { Readable } from 'stream';
import bytes from 'bytes';
import { MulterFile } from '../types/multer-file.type';

@Injectable()
export class S3FileStorageService {
  private readonly logger = new Logger(S3FileStorageService.name);
  private readonly s3Client: S3;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly minioEndpoint?: string;

  constructor(
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {
    const s3Config = this.configService.getOrThrow<IS3Configuration>('s3');

    this.bucketName = s3Config.bucket;
    this.region = s3Config.region;
    this.accessKeyId = s3Config.accessKeyId;
    this.secretAccessKey = s3Config.secretAccessKey;
    this.minioEndpoint = s3Config.minioEndpoint;

    this.s3Client = new S3({
      ...(this.minioEndpoint ? { endpoint: this.minioEndpoint } : {}),
      forcePathStyle: !!this.minioEndpoint,
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async uploadFile(file: MulterFile): Promise<string> {
    const key = this.generateUniqueFileName(file);

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: Readable.from([file.buffer]),
        ContentType: file.mimetype,
      },
      queueSize: 4,
      partSize: bytes('5MB')!,
      leavePartsOnError: false,
    });

    upload.on('httpUploadProgress', (progress) => {
      this.logger.log(`Upload progress: ${JSON.stringify(progress)}`);
    });

    try {
      const result = await upload.done();
      return result.Location as string;
    } catch (error) {
      this.logger.error(
        `Failed to upload file: ${key}`,
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  }

  private generateUniqueFileName(file: MulterFile): string {
    const extension = extname(file.originalname ?? '');

    return `${Date.now()}-${file.fieldname}${extension}`;
  }
}
