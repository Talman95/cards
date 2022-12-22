import { AccessoryType } from '../store/slices/packsSlice';

export const showPacksHelper = (param: string): { accessory: AccessoryType } => {
  if (param === 'my') {
    return { accessory: 'my' };
  }

  return { accessory: 'all' };
};
