import {api} from "./api";

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
export type CardType = {
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
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type AddCardType = {
    cardsPack_id: string
    question: string
    answer: string
    grade?: number
    shots?: number
    answerImg?: string //"url or base 64"
    questionImg?: string //"url or base 64"
    questionVideo?: string //"url or base 64"
    answerVideo?: string //"url or base 64"
}
export type UpdateCardType = {
    _id: string
    question?: string
    answer?: string
    comments?: string
}

export const cardsAPI = {
    getCards: (params: GetCardsParamsType) => {
        return api.get<GetCardsResponseType>('cards/card', {
            params: {...params}
        })
    },
    addCard: (card: AddCardType) => {
        return api.post('cards/card', {
            card: card
        })
    },
    deleteCard: (id: string) => {
        return api.delete('cards/card', {
            params: {
                id,
            }
        })
    },
    updateCard: (card: UpdateCardType) => {
        return api.put('cards/card', {
            card: card,
        })
    }
}