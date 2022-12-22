import { config } from '../config/config';

import { UpdateProfileType } from './types';

export const profileAPI = {
  updateProfile: (name: string, avatar: string) => {
    return config.put<UpdateProfileType>('auth/me', {
      name,
      avatar,
    });
  },
};
