import {instance} from "../../../c1-main/m3-dal/instance";

export type GetCardsParamsType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
type GetCardsResponseType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export const cardsAPI = {
    getCards: (params: GetCardsParamsType) => {
        return instance.get<GetCardsResponseType>('cards/card', {
            params: {...params}
        })
    },
}