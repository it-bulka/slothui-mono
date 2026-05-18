import type { ErrorHelper } from '@/shared/libs/errorHelper';
import type { getServices } from '@/shared/libs/services';
import type { RootState } from '@/app/config';

export type ThunkExtra = {
  services: ReturnType<typeof getServices>;
  updateToken: (t: string) => void;
  extractErrorMessage: typeof ErrorHelper.extractErrorMessage;
};

export type ThunkAPI = {
  state: RootState;
  extra: ThunkExtra;
  rejectValue: string;
};