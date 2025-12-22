import type { ErrorHelper } from '../../libs';
import type { createServices } from '@/shared/libs/services';
import type { RootState } from '@/app/config';

export type ThunkExtra = {
  services: ReturnType<typeof createServices>;
  updateToken: (t: string) => void;
  extractErrorMessage: typeof ErrorHelper.extractErrorMessage;
};

export type ThunkAPI = {
  state: RootState;
  extra: ThunkExtra;
  rejectValue: string;
};