export enum AccountStatus {
  NOT_VERIFY = 'not_verify',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum AccountRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type Account = {
  createdBy: string;
  createdOn: string;
  email: string;
  fullName: string;
  id: number;
  password: string;
  role: AccountRole;
  status: AccountStatus;
  updatedBy: string;
  updatedOn: string;
  username: string;
};
