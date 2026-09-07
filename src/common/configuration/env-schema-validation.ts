import joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.number().integer().default(3000),
  MONGODB_URI: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  ACCESS_TOKEN_EXPIRE_IN: joi.string().required().default('7d'),
});
