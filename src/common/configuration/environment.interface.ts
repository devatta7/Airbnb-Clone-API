export interface EnvironmentInterface {
  port: number;
  corsOrigins: string[];
  mongodbUri: string;
  jwtSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  systemAdmin: ISystemAdmin;
  s3: IS3Configuration;
  smtp: ISmtp;
}

export interface ISmtp {
  host: string;
  port: number;
  secure: boolean;
  auth?: {
    user: string;
    pass: string;
  };
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
