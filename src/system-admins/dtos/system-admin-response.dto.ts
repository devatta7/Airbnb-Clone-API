import { Exclude, Expose } from 'class-transformer';

export class SystemAdminResponseDto {
  @Expose()
  _id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  password: string;

  @Expose()
  isSuperAdmin: boolean;
}
