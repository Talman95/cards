import {instance, ProfileType} from "../../a1-login/l3-dal/authAPI";

type UpdateProfileType = {
    updatedUser: ProfileType
}

export const profileAPI = {
    updateProfile: (name: string, avatar: string = 'avatar') => {
        return instance.put<UpdateProfileType>('auth/me', {
            name,
            avatar,
        })
    },
}