import { EnvironmentInterface } from '../environment.interface';

export const defaultEnv = (): EnvironmentInterface => ({
  port: Number(process.env.PORT),
  mongodbUri: process.env.MONGODB_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
  systemAdmin: {
    name: process.env.SYSTEM_ADMIN_NAME!,
    email: process.env.SYSTEM_ADMIN_EMAIL!,
    password: process.env.SYSTEM_ADMIN_PASSWORD!,
  },
  s3: {
    region: process.env.AWS_S3_REGION!,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
    bucket: process.env.AWS_S3_BUCKET_NAME!,
    minioEndpoint: process.env.MINIO_S3_ENDPOINT,
  },
  smtp: {
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    ...(process.env.SMTP_AUTH_EMAIL && process.env.SMTP_AUTH_PASS
      ? {
          auth: {
            user: process.env.SMTP_AUTH_EMAIL,
            pass: process.env.SMTP_AUTH_PASS,
          },
        }
      : {}),
  },
});
