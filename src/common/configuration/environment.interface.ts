export interface EnvironmentInterface {
  port: number;
  mongodbUri: string;
  jwtSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  systemAdmin: ISystemAdmin;
}
export interface ISystemAdmin {
  name: string;
  email: string;
  password: string;
}
