import { AccessoryType } from '../store/Packs/packsSlice';

export const showPacksHelper = (param: string): { accessory: AccessoryType } => {
  if (param === 'my') {
    return { accessory: 'my' };
  }

  return { accessory: 'all' };
};
