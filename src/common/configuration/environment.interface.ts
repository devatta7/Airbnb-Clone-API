export interface EnvironmentInterface {
  port: number;
  mongodbUri: string;
  jwtSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  systemAdmin: ISystemAdmin;
  s3: IS3Configuration;
}

export interface IS3Configuration {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  minioEndpoint?: string;
}

export interface ISystemAdmin {
  name: string;
  email: string;
  password: string;
}
