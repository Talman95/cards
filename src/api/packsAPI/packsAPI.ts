import { config } from '../config/config';

import {
  AddPackParamsType,
  GetPacksParamsType,
  GetPacksType,
  UpdatePackType,
} from './types';

export const packsAPI = {
  getPacks: ({
    packName,
    min,
    max,
    sortPacks,
    page,
    pageCount,
    user_id,
  }: GetPacksParamsType) => {
    return config.get<GetPacksType>('cards/pack', {
      params: {
        packName,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        user_id,
      },
    });
  },

  addPack: ({ name, deckCover, isPrivate }: AddPackParamsType) => {
    return config.post('cards/pack', {
      cardsPack: {
        name,
        deckCover,
        private: isPrivate,
      },
    });
  },

  deletePack: (id: string) => {
    return config.delete(`cards/pack?id=${id}`);
  },

  updatePack: ({ _id, name, deckCover, isPrivate }: UpdatePackType) => {
    return config.put('cards/pack', {
      cardsPack: {
        _id,
        name,
        deckCover,
        private: isPrivate,
      },
    });
  },
};
