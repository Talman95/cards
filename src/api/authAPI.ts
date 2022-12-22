import { api } from './api';

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type RegisterParamsType = {
  email: string;
  password: string;
};
export type ProfileType = {
  avatar: string;
  created: string;
  email: string;
  isAdmin: boolean;
  name: string;
  publicCardPacksCount: number;
  rememberMe: boolean;
  token: string;
  tokenDeathTime: number;
  updated: string;
  verified: boolean;
  __v: number;
  _id: string;
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
type LogoutType = {
  info: string;
  error?: string;
};

export const authAPI = {
  login: (params: LoginParamsType) => {
    return api.post<ProfileType>('auth/login', { ...params });
  },
  authMe: () => {
    return api.post<ProfileType>('auth/me', {});
  },
  logout: () => {
    return api.delete<LogoutType>('auth/me', {});
  },
  register: (params: RegisterParamsType) => {
    return api.post<AddedUserType>('/auth/register', { ...params });
  },
  sendPassword: (email: string) => {
    return api.post('auth/forgot', {
      email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: chartreuse; padding: 15px">
                      password recovery link: 
                      <a href='http://localhost:3000/cards/#/set-new-password/$token$'>
                      follow the link
                      </a>
                      </div>`,
    });
  },
  setNewPassword: (password: string, resetPasswordToken: string | undefined = '') => {
    return api.post('auth/set-new-password', {
      password,
      resetPasswordToken,
    });
  },
};
