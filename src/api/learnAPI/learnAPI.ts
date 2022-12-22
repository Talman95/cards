import { config } from '../config/config';

import { UpdatedGradeType } from './types';

export const learnAPI = {
  updateGrade: (grade: number, card_id: string) => {
    return config.put<{ updatedGrade: UpdatedGradeType }>('cards/grade', {
      grade,
      card_id,
    });
  },
};
