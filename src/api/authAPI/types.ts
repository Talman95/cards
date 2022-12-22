export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterParamsType = {
  email: string;
  password: string;
};

export type AddedUserType = {
  created: string;
  email: string;
  isAdmin: boolean;
  name: string;
  publicCardPacksCount: 0;
  rememberMe: boolean;
  updated: string;
  verified: boolean;
  __v: number;
  _id: string;
};

export type LogoutType = {
  info: string;
  error?: string;
};
