import {instance} from "../../../c1-main/m3-dal/instance";

export type GetPacksParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}
type GetPacksType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}

export const packsAPI = {
    getPacks: ({packName, min, max, sortPacks, page = 1, pageCount, user_id}: GetPacksParamsType) => {
        return instance.get<GetPacksType>('/cards/pack', {
            params: {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                user_id,
            }
        })
    }
}