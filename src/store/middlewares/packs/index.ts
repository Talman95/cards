import { addPack } from './addPack';
import { deletePack } from './deletePack';
import { getPacks } from './getPacks';
import { updatePack } from './updatePack';

export const packsAsyncThunks = {
  getPacks,
  addPack,
  deletePack,
  updatePack,
};
