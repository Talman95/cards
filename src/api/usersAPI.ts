import {api} from "./api";

export type GetUsersParams = {
    userName?: string
    min?: number | null
    max?: number | null
    sortUsers?: string | null
    page?: number
    pageCount?: number
}
export type UserType = {
    avatar: string | null
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    updated: string
    verified: false
    _id: string
}
type GetUsersResponseType = {
    users: UserType[]
    maxPublicCardPacksCount: number
    minPublicCardPacksCount: number
    page: number
    pageCount: number
    usersTotalCount: number
}

export const usersAPI = {
    getUsers: (params?: GetUsersParams) => {
        return api.get<GetUsersResponseType>('social/users', {
            params
        })
    },
    getUserData: (id: string) => {
        return api.get<{user: UserType}>(`social/user?id=${id}`)
    },
}