export interface EnvironmentInterface {
  port: number;
  mongodbUri: string;
  jwtSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}
