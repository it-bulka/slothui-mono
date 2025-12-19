import type { ErrorHelper } from '../../libs';
import type { createServices } from '@/shared/libs/services';

export type ThunkExtra = {
  services: ReturnType<typeof createServices>;
  updateToken: (t: string) => void;
  extractErrorMessage: typeof ErrorHelper.extractErrorMessage;
};

export type ThunkAPI = {
  extra: ThunkExtra;
  rejectValue: string;
};