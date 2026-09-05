import { EnvironmentInterface } from '../environment.interface';

export const defaultEnv = (): EnvironmentInterface => ({
  port: Number(process.env.PORT),
  mongodbUri: process.env.MONGODB_URI!,
});
