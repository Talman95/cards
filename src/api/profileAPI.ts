import {ProfileType} from "./authAPI";
import {api} from "./api";

type UpdateProfileType = {
    updatedUser: ProfileType
}

export const profileAPI = {
    updateProfile: (name: string, avatar: string = 'avatar') => {
        return api.put<UpdateProfileType>('auth/me', {
            name,
            avatar,
        })
    },
}