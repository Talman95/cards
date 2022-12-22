import { UserType } from '../../types';
import { config } from '../config/config';

import { GetUsersParams, GetUsersResponseType } from './types';

export const usersAPI = {
  getUsers: (params?: GetUsersParams) => {
    return config.get<GetUsersResponseType>('social/users', {
      params,
    });
  },

  getUserData: (id: string) => {
    return config.get<{ user: UserType }>(`social/user?id=${id}`);
  },
};
