import { ProfileType } from '../../types';
import { config } from '../config/config';

import { LoginParamsType, LogoutType, RegisterParamsType } from './types';

export const authAPI = {
  login: (params: LoginParamsType) => {
    return config.post<ProfileType>('auth/login', { ...params });
  },

  authMe: () => {
    return config.post<ProfileType>('auth/me', {});
  },

  logout: () => {
    return config.delete<LogoutType>('auth/me', {});
  },

  register: (params: RegisterParamsType) => {
    return config.post('/auth/register', { ...params });
  },

  sendPassword: (email: string) => {
    return config.post('auth/forgot', {
      email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: chartreuse; padding: 15px">
                      password recovery link: 
                      <a href='https://Talman95.github.io/cards/#/set-new-password/$token$'>
                      follow the link
                      </a>
                      </div>`,
    });
  },

  setNewPassword: (password: string, resetPasswordToken: string | undefined = '') => {
    return config.post('auth/set-new-password', {
      password,
      resetPasswordToken,
    });
  },
};
