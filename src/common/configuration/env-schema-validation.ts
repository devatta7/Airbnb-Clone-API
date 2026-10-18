import joi from 'joi';

export const envSchema = joi.object({
  NODE_ENV: joi.string().valid('development', 'staging', 'production').default('development'),
  PORT: joi.number().integer().default(3000),
  CORS_ORIGINS: joi.string().when('NODE_ENV', {
    is: 'production',
    then: joi.required(),
    otherwise: joi.string().default('http://localhost:5173'),
  }),
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
  SMTP_HOST: joi.string().required(),
  SMTP_PORT: joi.number().integer().positive().required(),
  SMTP_SECURE: joi.boolean().required(),
  SMTP_AUTH_EMAIL: joi.string().optional().allow('').default(''),
  SMTP_AUTH_PASS: joi.string().optional().allow('').default(''),
});
