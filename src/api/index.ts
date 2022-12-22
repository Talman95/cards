import { authAPI } from './authAPI/authAPI';
import { LoginParamsType, RegisterParamsType } from './authAPI/types';
import { cardsAPI } from './cardsAPI/cardsAPI';
import { AddCardType, UpdateCardType } from './cardsAPI/types';
import { chatAPI } from './chatAPI/chatAPI';
import { learnAPI } from './learnAPI/learnAPI';
import { packsAPI } from './packsAPI/packsAPI';
import { AddPackParamsType, UpdatePackType } from './packsAPI/types';
import { profileAPI } from './profileAPI/profileAPI';
import { usersAPI } from './usersAPI/usersAPI';

export { authAPI, cardsAPI, chatAPI, learnAPI, packsAPI, profileAPI, usersAPI };

export type {
  LoginParamsType,
  RegisterParamsType,
  AddCardType,
  UpdateCardType,
  AddPackParamsType,
  UpdatePackType,
};
