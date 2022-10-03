import {api} from "./api";

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
    cardsCount: number
    created: string // data
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string // data
    user_id: string
    user_name: string
    __v: number
    _id: string
}
type GetPacksType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
export type AddPackParamsType = {
    name: string
    deckCover?: string
    isPrivate?: boolean
}
export type UpdatePackType = {
    _id: string
    name?: string
    deckCover?: string
    isPrivate?: boolean
}

export const packsAPI = {
    getPacks: ({packName, min, max, sortPacks, page = 1, pageCount, user_id}: GetPacksParamsType) => {
        return api.get<GetPacksType>('cards/pack', {
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
    },
    addPack: ({name, deckCover, isPrivate}: AddPackParamsType) => {
        return api.post('cards/pack', {
            cardsPack: {
                name,
                deckCover,
                private: isPrivate,
            }
        })
    },
    deletePack: (id: string) => {
        return api.delete(`cards/pack?id=${id}`)
    },
    updatePack: ({_id, name, deckCover, isPrivate}: UpdatePackType) => {
        return api.put('cards/pack', {
            cardsPack: {
                _id,
                name,
                deckCover,
                private: isPrivate,
            }
        })
    },
}