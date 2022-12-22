import { api } from './api';
import { ProfileType } from './authAPI';

type UpdateProfileType = {
  updatedUser: ProfileType;
};

export const profileAPI = {
  updateProfile: (name: string, avatar: string) => {
    return api.put<UpdateProfileType>('auth/me', {
      name,
      avatar,
    });
  },
};
