import {instance} from "../../../c1-main/m3-dal/instance";

type UpdatedGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

export const learnAPI = {
    updateGrade: (grade: number, card_id: string) => {
        return instance.put<{updatedGrade: UpdatedGradeType}>('cards/grade', {
            grade,
            card_id,
        })
    }
}