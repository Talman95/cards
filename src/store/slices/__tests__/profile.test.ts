import { ProfileType } from '../../../types';
import { profileAsyncThunks } from '../../middlewares/profile';
import { profileActions, profileSlice } from '../profileSlice';

describe('authSlice', () => {
  const profile: ProfileType = {
    avatar: 'avatar',
    created: 'created',
    email: 'email',
    isAdmin: false,
    name: 'roman',
    publicCardPacksCount: 70,
    rememberMe: true,
    token: '123',
    tokenDeathTime: 15,
    updated: 'updated',
    verified: true,
    __v: 123,
    _id: 'id7',
  };

  let initialState: {
    profile: null | ProfileType;
  };

  beforeEach(() => {
    initialState = {
      profile: null,
    };
  });

  it('should return default state when we pass empty action', () => {
    const result = profileSlice(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should profile be set', () => {
    const action = profileActions.setProfile({ profile });
    const result = profileSlice(initialState, action);

    expect(result.profile).toBe(profile);
  });

  it('should change profile with "updateProfile.fulfilled" action', () => {
    const action = {
      type: profileAsyncThunks.updateProfile.fulfilled.type,
      payload: { profile },
    };

    const state = profileSlice(initialState, action);

    expect(state.profile).toBe(profile);
  });
});
