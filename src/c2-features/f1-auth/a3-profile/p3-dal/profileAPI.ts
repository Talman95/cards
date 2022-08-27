import {ProfileType} from "../../a1-login/l3-dal/authAPI";
import {instance} from "../../../../c1-main/m3-dal/instance";

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