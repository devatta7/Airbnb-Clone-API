import joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.number().integer().default(3000),
  MONGODB_URI: joi.string().required(),

  JWT_SECRET: joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: joi.string().default('15m'),
  REFRESH_TOKEN_EXPIRES_IN: joi.string().default('7d'),
  SYSTEM_ADMIN_NAME: joi.string().required(),
  SYSTEM_ADMIN_EMAIL: joi.string().email().required(),
  SYSTEM_ADMIN_PASSWORD: joi.string().required(),
  AWS_S3_REGION: joi.string().required(),
  AWS_S3_ACCESS_KEY_ID: joi.string().required(),
  AWS_S3_SECRET_ACCESS_KEY: joi.string().required(),
  AWS_S3_BUCKET_NAME: joi.string().required(),
  MINIO_S3_ENDPOINT: joi.string().uri().default('undefined'),
});
