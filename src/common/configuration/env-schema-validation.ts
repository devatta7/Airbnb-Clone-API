import joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.number().integer().default(3000),
  MONGODB_URI: joi.string().required(),
});
