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
});
