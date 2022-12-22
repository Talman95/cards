import { getAuthData } from './getAuthData';
import { login } from './login';
import { logout } from './logout';
import { register } from './register';
import { sendPassword } from './sendPassword';
import { setNewPassword } from './setNewPassword';

export const authAsyncThunks = {
  login,
  getAuthData,
  logout,
  register,
  sendPassword,
  setNewPassword,
};
